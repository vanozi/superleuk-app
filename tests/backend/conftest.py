import os
from typing import Generator

import pytest
from httpx import AsyncClient
from starlette.testclient import TestClient
from tortoise import Tortoise
from tortoise.contrib.fastapi import register_tortoise
from tortoise.exceptions import OperationalError

from app.config import Settings, get_settings
from app.main import create_application
from app.models.pydantic import AllowedUsersCreateSchema, MachineCreateSchema
from app.models.tortoise import Roles, Users
from app.services.mail import fm


def get_settings_override():
    return Settings(testing=1, database_url=os.environ.get("DATABASE_URL_TEST_BACKEND"))


async def init_db(
    db_url,
    create_db: bool = False,
    create_schemas: bool = False,
    create_test_data: bool = False,
) -> None:
    """Initial database connection"""
    await Tortoise.init(
        db_url=db_url,
        modules={"models": ["app.models.tortoise"]},
        _create_db=create_db,
    )
    if create_schemas:
        await Tortoise.generate_schemas()
    if create_test_data:
        # Insert testdata into the database
        # load testdata script
        conn = Tortoise.get_connection("default")
        with open("db/sql_files/setup_testdata.sql") as file:
            lines = [line.rstrip() for line in file]
            for line in lines:
                await conn.execute_query(line)


async def init(db_url: str = os.environ.get("DATABASE_URL_TEST_BACKEND")):
    await init_db(db_url, True, True, True)


@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"


@pytest.fixture(scope="session")
async def test_client(anyio_backend):
    app = create_application()
    await init()
    async with AsyncClient(app=app, base_url=os.getenv("BASE_URL_API")) as client:
        yield client
    await client.aclose()
    await Tortoise._drop_databases()
    print("Database dropped")


@pytest.fixture(scope="function")
async def admin_token(test_client):
    # Get admin access token
    response = await test_client.post(
        url="/auth/login",
        headers={},
        data={"username": "admin@admin.com", "password": "admin"},
        files=[],
    )
    yield response.json()["access_token"]


@pytest.fixture(scope="function")
async def werknemer_token(test_client):
    # Get admin access token
    response = await test_client.post(
        url="/auth/login",
        headers={},
        data={"username": "werknemer@werknemer.com", "password": "werknemer"},
        files=[],
    )
    yield response.json()["access_token"]


@pytest.fixture(scope="function")
async def invite_new_user_fixture(test_client, admin_token: str):
    async def _send_invitation(email_adress: str):
        fm.config.SUPPRESS_SEND = 1
        headers = {
            "Authorization": f"Bearer {admin_token}",
            "Content-Type": "application/json",
        }
        payload = AllowedUsersCreateSchema(email=email_adress).json()
        response = await test_client.post(
            "/allowed_users/", headers=headers, content=payload
        )
        return response.status_code

    return _send_invitation


@pytest.fixture(scope="function")
async def insert_new_machine_fixture(test_client, admin_token: str):
    async def _add_new_machine(work_number: str):
        headers = {
            "Authorization": f"Bearer {admin_token}",
            "Content-Type": "application/json",
        }
        payload = MachineCreateSchema(
            work_number=work_number,
            work_name="Test Machine 3",
            category="Trekker 3",
            group="Gemotoriseerd 3",
            brand_name="John Deere 3",
            type_name="7810 3",
            licence_number="MM-11-XX 3",
            chassis_number="123456789 3",
            construction_year="2012",
            ascription_code="1234567801",
        ).json()
        response = await test_client.post(
            "/machines/", headers=headers, content=payload
        )
        return response.status_code

    return _add_new_machine


# HTML REPORT HOOKS
def pytest_html_report_title(report):
    report.title = "Backend Test Report"
