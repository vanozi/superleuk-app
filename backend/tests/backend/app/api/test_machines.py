import json
from unicodedata import category

import pytest
from app.models.pydantic import MachineCreateSchema
from fastapi.testclient import TestClient

pytestmark = pytest.mark.anyio


@pytest.mark.apitest
@pytest.mark.dev
async def test_add_machine(test_client: TestClient, admin_token: str):
    headers = {
        "Authorization": f"Bearer {admin_token}",
        "Content-Type": "application/json",
    }
    payload = MachineCreateSchema(
        work_number="M24",
        work_name="Test Machine",
        category="Trekker",
        group="Gemotoriseerd",
        brand_name="John Deere",
        type_name="7810",
        licence_number="MM-11-XX",
        chassis_number="123456789",
        construction_year="2010",
        ascription_code="123456789",
    ).json()
    response = await test_client.post("/machines/", headers=headers, content=payload)
    assert response.status_code == 201
    assert response.json()["id"]
    assert response.json()["work_number"] == "M24"
    assert response.json()["work_name"] == "Test Machine"
    assert response.json()["category"] == "Trekker"
    assert response.json()["group"] == "Gemotoriseerd"
    assert response.json()["brand_name"] == "John Deere"
    assert response.json()["type_name"] == "7810"
    assert response.json()["licence_number"] == "MM-11-XX"
    assert response.json()["chassis_number"] == "123456789"
    assert response.json()["construction_year"] == 2010
    assert response.json()["ascription_code"] == "123456789"


@pytest.mark.apitest
@pytest.mark.dev
async def test_update_machine(test_client: TestClient, admin_token: str):
    headers = {
        "Authorization": f"Bearer {admin_token}",
        "Content-Type": "application/json",
    }
    payload = MachineCreateSchema(
        work_number="M24",
        work_name="Test Machine 2",
        category="Trekker 2",
        group="Gemotoriseerd 2",
        brand_name="John Deere 2",
        type_name="7810 2",
        licence_number="MM-11-XX 2",
        chassis_number="123456789 2",
        construction_year="2011",
        ascription_code="123456780",
    ).json()
    response = await test_client.put("/machines/", headers=headers, content=payload)
    assert response.status_code == 200
    assert response.json()["id"]
    assert response.json()["work_number"] == "M24"
    assert response.json()["work_name"] == "Test Machine 2"
    assert response.json()["category"] == "Trekker 2"
    assert response.json()["group"] == "Gemotoriseerd 2"
    assert response.json()["brand_name"] == "John Deere 2"
    assert response.json()["type_name"] == "7810 2"
    assert response.json()["licence_number"] == "MM-11-XX 2"
    assert response.json()["chassis_number"] == "123456789 2"
    assert response.json()["construction_year"] == 2011
    assert response.json()["ascription_code"] == "123456780"


@pytest.mark.apitest
@pytest.mark.dev
async def test_get_single_machine(test_client: TestClient, werknemer_token: str):
    headers = {
        "Authorization": f"Bearer {werknemer_token}",
        "Content-Type": "application/json",
    }
    response = await test_client.get("/machines/1", headers=headers)
    assert response.status_code == 200


@pytest.mark.apitest
@pytest.mark.dev
async def test_get_all_machines(test_client: TestClient, werknemer_token: str):
    headers = {
        "Authorization": f"Bearer {werknemer_token}",
        "Content-Type": "application/json",
    }
    response = await test_client.get("/machines/", headers=headers)
    assert response.status_code == 200
