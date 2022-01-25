import os
from typing import Generator

import pytest
from app.config import Settings, get_settings
from app.main import create_application
from app.models.tortoise import Roles, Users
from httpx import AsyncClient
from starlette.testclient import TestClient
from tortoise import Tortoise
from tortoise.contrib.fastapi import register_tortoise

from app.services.mail import fm
from app.models.pydantic import AllowedUsersCreateSchema


def get_settings_override():
    return Settings(testing=1, database_url=os.environ.get("DATABASE_TEST_BACKEND_URL"))


async def init_db(db_url, create_db: bool = False, schemas: bool = False) -> None:
    """Initial database connection"""
    await Tortoise.init(
        db_url=db_url, modules={"models": ["app.models.tortoise"]}, _create_db=create_db
    )
    if create_db:
        print(f"Database created! {db_url}")
    if schemas:
        await Tortoise.generate_schemas()
        print("Success created database schema")


async def init(db_url: str = os.environ.get("DATABASE_TEST_BACKEND_URL")):
    await init_db(db_url, True, True)
    # Insert testdata into the database
    # Roles
    admin_role = await Roles.create(name="admin", description="User met admin rechten")
    werknemer_role = await Roles.create(
        name="werknemer", description="User met algemene werknemers rechten"
    )
    # Users
    admin_user = await Users.create(
        email="admin@admin.com",
        hashed_password="$2b$12$UKv6whbIteBbIsION9igLef5qOS6yzLn1MczUCST7X6RDn18afzZ2",
        is_active=True,
        confirmation=None,
    )
    werknemer_user = await Users.create(
        email="werknemer@werknemer.com",
        hashed_password="$2b$12$X6OGY1eXztIH2rYDwyVFO.nmrPYq98kla4JmweOu4N/oMgoe3yaKK",
        is_active=True,
        confirmation=None,
    )
    # Userroles
    await admin_user.roles.add(admin_role)
    await werknemer_user.roles.add(werknemer_role)


@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"


@pytest.fixture(scope="session")
async def test_client(anyio_backend):
    app = create_application()
    await init()
    async with AsyncClient(app=app, base_url=os.getenv("BASE_URL_API")) as client:
        yield client
    await Tortoise._drop_databases()
    print("Database dropped")
    await client.aclose()


@pytest.fixture(scope="session")
async def request_headers_admin(test_client):
    # Get admin access token
    response = await test_client.post(
        url="/auth/login",
        headers={},
        data={"username": "admin@admin.com", "password": "admin"},
        files=[],
    )
    yield {
        "Authorization": f"Bearer {response.json()['access_token']}",
        "Content-Type": "application/json",
    }


@pytest.fixture(scope="session")
async def request_headers_werknemer(test_client):
    # Get admin access token
    response = await test_client.post(
        url="/auth/login",
        headers={},
        data={"username": "werknemer@werknemer.com", "password": "werknemer"},
        files=[],
    )
    yield {
        "Authorization": f"Bearer {response.json()['access_token']}",
        "Content-Type": "application/json",
    }


@pytest.fixture(scope="function")
async def invite_new_user_fixture(test_client, request_headers_admin):
    async def _send_invitation(email_adress: str):
        fm.config.SUPPRESS_SEND = 1
        payload = AllowedUsersCreateSchema(email=email_adress).json()
        response = await test_client.post(
            "/allowed_users/", headers=request_headers_admin, content=payload
        )
        return response.status_code
    return _send_invitation


# HTML REPORT HOOKS
def pytest_html_report_title(report):
   report.title = 'Backend Test Report'