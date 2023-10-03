import requests

from app.models.tortoise import JDLink
from app.services.auth import RoleChecker
from fastapi import APIRouter
from fastapi.param_functions import Depends

router = APIRouter()

BASE_URL = "https://sandboxapi.deere.com/platform"


@router.get(
    "/organizations/",
    dependencies=[Depends(RoleChecker(["admin"]))],
)
async def get_organizations():
    jd_credentials = await JDLink.first()
    res = requests.get(BASE_URL + "/organizations",
                       headers={"Authorization": "Bearer " + jd_credentials.access_token,
                                'Accept': 'application/vnd.deere.axiom.v3+json'})
    return res.json()


@router.get(
    "/machines",
    dependencies=[Depends(RoleChecker(["admin"]))],
)
async def get_machines():
    jd_credentials = await JDLink.first()
    res = requests.get(BASE_URL + "/organizations/10047/machines",
                       headers={"Authorization": "Bearer " + jd_credentials.access_token,
                                'Accept': 'application/vnd.deere.axiom.v3+json'})
    return res.json()


