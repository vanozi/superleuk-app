import json, os

import pytest
from app.models.pydantic import AllowedUsersCreateSchema
from app.services.mail import fm
from fastapi.testclient import TestClient

pytestmark = pytest.mark.anyio


@pytest.mark.apitest
async def test_add_allowed_users(test_client: TestClient, admin_token: str):
    fm.config.SUPPRESS_SEND = 1
    with fm.record_messages() as outbox:
        payload = AllowedUsersCreateSchema(email="test_gebruiker1@test.com").json()
        # For uploading raw text or binary content we prefer to use a content parameter,
        # in order to better separate this usage from the case of uploading form data.
        headers = {
            "Authorization": f"Bearer {admin_token}",
            "Content-Type": "application/json",
        }
        response = await test_client.post(
            "/allowed_users/", headers=headers, content=payload
        )
        assert response.status_code == 201
        assert response.json()["id"]
        assert response.json()["created_at"]
        assert response.json()["last_modified_at"]
        assert response.json()["email"] == "test_gebruiker1@test.com"
        # Check if email has been send out correctly
        assert len(outbox) == 1
        assert (
            outbox[0]["from"]
            == f'{os.environ.get("MAIL_FROM_NAME")} <{os.environ.get("MAIL_FROM")}>'
        )
        assert outbox[0]["To"] == "test_gebruiker1@test.com"
        assert outbox[0]["Subject"] == "Uitnoding voor Gebr. Vroege app"


@pytest.mark.apitest
async def test_add_allowed_users_invalid_email_address(
    test_client: TestClient, admin_token: str
):
    headers = {
        "Authorization": f"Bearer {admin_token}",
        "Content-Type": "application/json",
    }
    payload = json.dumps(
        {
            "email": "test_gebruiker@testcom",
        }
    )
    response = await test_client.post(
        "/allowed_users/", headers=headers, content=payload
    )
    assert response.status_code == 422
    assert response.json()["detail"][0]["msg"] == "value is not a valid email address"
    assert response.json()["detail"][0]["type"] == "value_error.email"


@pytest.mark.apitest
async def test_allowed_user_allready_invited(
    test_client: TestClient, admin_token: str, invite_new_user_fixture: int
):
    # Invite user for registration
    await invite_new_user_fixture("test_gebruiker2@test.com")
    headers = {
        "Authorization": f"Bearer {admin_token}",
        "Content-Type": "application/json",
    }
    payload = AllowedUsersCreateSchema(email="test_gebruiker2@test.com").json()
    response = await test_client.post(
        "/allowed_users/", headers=headers, content=payload
    )
    assert response.status_code == 400
    assert (
        response.json()["detail"]
        == "Er is al een uitnodiging gestuurd naar dit e-mailadres"
    )


@pytest.mark.apitest
async def test_allowed_user_allready_registered(
    test_client: TestClient, admin_token: str
):
    headers = {
        "Authorization": f"Bearer {admin_token}",
        "Content-Type": "application/json",
    }
    payload = AllowedUsersCreateSchema(email="werknemer@werknemer.com").json()
    response = await test_client.post(
        "/allowed_users/", headers=headers, content=payload
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "Dit e-mailadres is al geregistreerd"


@pytest.mark.apitest
async def test_add_allowed_users_insufficient_privilege(
    test_client: TestClient, werknemer_token: dict
):
    payload = AllowedUsersCreateSchema(email="test_werknemer@test.com").json()
    response = await test_client.post(
        "/allowed_users/",
        headers={
            "Authorization": f"Bearer {werknemer_token}",
            "Content-Type": "application/json",
        },
        content=payload,
    )
    assert response.status_code == 403
    assert response.json()["detail"] == "Operation not permitted"
