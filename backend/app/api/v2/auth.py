import os
import time

from app.config import Settings, get_fastapi_mail_config, get_settings
from app.models.pydantic import (
    EmailSchema,
    ResetPassword,
    TokenSchema,
    User_Pydantic,
)
from app.models.pydantic_models.auth import RegisterUserRequest, UserResponse
from app.models.pydantic_models.general_responses import HTTPError, SuccessResponse

from app.models.tortoise import AllowedUsers, Roles, Users
from app.services.v2.auth import Auth
from app.services.v2.mail import Mailer
from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request,
    Response,
    BackgroundTasks,
)
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_mail import ConnectionConfig
from jose import jwt
from starlette import status
from starlette.responses import JSONResponse
from datetime import datetime, timezone

router = APIRouter()


@router.post("/register", response_model=UserResponse, status_code=201)
async def register(
    register_info: RegisterUserRequest, background_tasks: BackgroundTasks
) -> User_Pydantic:
    email = register_info.email.lower()
    user = await Users.get_or_none(email=email)
    if user is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Gebruiker bestaat al",
        )

    allowed_user = await AllowedUsers.get_or_none(email=email)
    if allowed_user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Dit email adres is niet bevoegd om zich te registeren",
        )

    hashed_password = Auth.get_password_hash(register_info.password.get_secret_value())

    try:
        # Create User
        user = await Users.create(
            first_name=register_info.first_name,
            last_name=register_info.last_name,
            email=register_info.email.lower(),
            hashed_password=hashed_password,
        )

        confirmation_token = Auth.get_confirmation_token(user.email)
        user.confirmation = confirmation_token["jti"]
        await user.save()

        # Add user roles
        role = await Roles.get(name="werknemer")
        await user.roles.add(role)

        # Send welcome message to the user
        email_schema = EmailSchema(
            recipient_addresses=[user.email],
            body={
                "first_name": user.first_name,
                "base_url": os.getenv("BASE_URL_FRONTEND"),
                "confirmation_token": confirmation_token["token"],
            },
        )
        background_tasks.add_task(Mailer.send_welcome_message, email=email_schema)
        # Remove user from allowed users table
        await allowed_user.delete()
        await user.fetch_related("roles")
        return user

    except Exception as e:
        if user:
            await user.delete()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=e,
        )


@router.post(
    "/activate_account",
    status_code=200,
    responses={
        200: {"model": SuccessResponse, "description": "Account geactiveerd"},
        400: {"model": HTTPError, "description": "Bad Request"},
        500: {"model": HTTPError, "description": "Internal Server Error"},
    },
)
async def activate_account(
    token: TokenSchema, settings: Settings = Depends(get_settings)
):
    token = token.token
    invalid_token_error = HTTPException(status_code=400, detail="Ongeldige token")
    # Check if token expiration date is reached
    try:
        payload = jwt.decode(
            token,
            settings.secret_key.get_secret_value(),
            algorithms=settings.token_algorithm,
        )
    except jwt.JWTError as e:
        raise HTTPException(status_code=400, detail=str(e))
    if payload["scope"] != "registration":
        raise invalid_token_error
    user = await Users.get_or_none(email=payload["sub"])
    # Check if token belongs to user and not already been used
    if not user or user.confirmation is None or user.confirmation.hex != payload["jti"]:
        raise invalid_token_error
    if user.is_active:
        raise HTTPException(status_code=400, detail="Deze gebruiker is al geactiveerd")
    # Set confirmation UID to None and user to active
    try:
        user.confirmation = None
        user.is_active = True
        await user.save()
        return JSONResponse(
            content={"detail": "Account geactiveerd"},
            status_code=200,
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(
                "Er is een onverwachte fout opgetreden bij het opslaan in de database"
            ),
        )


@router.get("/resent_activation_token/{email}", status_code=200)
async def resent_activation_code(
    email: str, config: ConnectionConfig = Depends(get_fastapi_mail_config)
):
    # Check if user allready exists
    if await Users.get_or_none(email=email.lower()) is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Dit email adres is niet bekend",
        )
    user = await Users.get(email=email)
    # Check that account is not yet activated
    if user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Deze gebruiker is al geactiveerd",
        )

    # create confirmation token and add the jti to the database user
    confirmation_token = Auth.get_confirmation_token(user.email)
    user.confirmation = confirmation_token["jti"]
    await user.save()
    try:
        await Mailer.send_welcome_message(
            email=EmailSchema(
                recipient_addresses=[user.email],
                body={
                    "base_url": os.getenv("BASE_URL_FRONTEND"),
                    "fist_name": user.first_name,
                    "confirmation_token": confirmation_token["token"],
                },
            ),
        )
    except Exception:
        await user.delete()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(
                "Er is een onverwachte fout opgetreden bij het versturen van de email"
            ),
        )


@router.post(
    "/login",
    status_code=200,
    responses={401: {"model": HTTPError, "description": "Niet geautoriseerd"}},
)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    user = await Auth.authenticate_user(
        email=form_data.username.lower(), password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Ongeldige combinatie gebruikersnaam en wachtwoord",
        )
    if user.is_active is False:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Gebruiker inactief",
        )
    access_token = Auth.get_access_token(email=user.email)
    refresh_token = Auth.get_refresh_token(email=user.email)
    response = JSONResponse(
        {
            "access_token": f"{access_token['token']}",
        }
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token["token"],
        httponly=True,
        samesite=None,
    )
    return response


@router.get("/efresh")
async def refresh(request: Request, settings: Settings = Depends(get_settings)):
    # get refresh token from cookie header
    refresh_token = request.cookies.get("refresh_token")
    if refresh_token is None:
        return Response(status_code=403)
    # Check if token expiration date is reached
    try:
        payload = jwt.decode(
            refresh_token,
            settings.secret_key.get_secret_value(),
            algorithms=settings.token_algorithm,
        )
    except jwt.JWTError:
        raise HTTPException(status_code=403, detail="Refresh token is verlopen")
    # Check if scope of the token is valid
    if payload["scope"] != "refresh":
        raise Response(status_code=400)
    user = await Users.get_or_none(email=payload["sub"])
    # Check if token belongs to user and not already been used
    if not user:
        raise Response(status_code=400)
    access_token = Auth.get_access_token(email=user.email)
    refresh_token = Auth.get_refresh_token(email=user.email)
    return JSONResponse(
        {
            "access_token": access_token["token"],
            "refresh_token": refresh_token["token"],
            "token_type": "bearer",
        },
        status_code=200,
    )


@router.get("/forgot_password/{email}")
async def forgot_password(
    email: str,
    config: ConnectionConfig = Depends(get_fastapi_mail_config),
):
    # check if email address exists
    user = await Users.get_or_none(email=email.lower())
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Deze gebruiker bestaat niet",
        )
    # kijken of de gebruiker actief is
    if user.is_active is False:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Deze gebruiker is nog niet actief",
        )
    reset_password_token = Auth.get_reset_password_token(email=user.email)
    try:
        await Mailer.send_reset_password_message(
            email=EmailSchema(
                recipient_addresses=[user.email],
                body={
                    "first_name": user.first_name,
                    "base_url": os.getenv("BASE_URL_FRONTEND"),
                    "reset_password_token": reset_password_token["token"],
                },
            ),
        )
        return JSONResponse(
            {
                "message": (
                    "Er is een link verstuurd waarmee je je wachtwoord kunt resetten"
                )
            },
            status_code=200,
        )
    except HTTPException:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(
                "Er is een onverwachte fout opgetreden bij het versturen van de email"
            ),
        )


@router.post("/reset_password")
async def reset_password(
    reset_info: ResetPassword, settings: Settings = Depends(get_settings)
):
    invalid_token_error = HTTPException(status_code=400, detail="Deze link is ongeldig")
    # Check if token expiration date is reached
    try:
        payload = jwt.decode(
            reset_info.token,
            settings.secret_key.get_secret_value(),
            algorithms=settings.token_algorithm,
        )
    except jwt.JWTError:
        raise HTTPException(status_code=403, detail="Deze link is verlopen")
    # Check if scope of the token is valid
    if payload["scope"] != "reset-password":
        raise invalid_token_error
    user = await Users.get_or_none(email=payload["sub"])
    # Check if token belongs to user and not already been used
    if not user:
        raise invalid_token_error

    # Update password
    ## Create password hash for new password and save in the database
    new_password_hashed = Auth.get_password_hash(reset_info.password.get_secret_value())
    user.hashed_password = new_password_hashed
    await user.save()
    # Create a success respons
    return JSONResponse({"detail": "Wachtwoord succesvol gereset"}, status_code=200)


@router.post("/logout")
async def logout():
    response = JSONResponse({"detail": "Uitgelogd"}, status_code=200)
    response.delete_cookie(key="refresh_token")
    return response