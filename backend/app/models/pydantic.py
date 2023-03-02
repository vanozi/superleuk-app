from typing import Any, Dict, List, Optional

from app.models.tortoise import (
    AllowedUsers,
    GeneralMaintenance,
    Roles,
    Users,
    WorkingHours,
    Machines,
    MaintenanceMachines,
    TankTransactions,
)

from app.models.enums import MaintenanceIssueStatus

import pydantic
from pydantic import validator
import datetime
from pydantic import EmailStr, constr
from tortoise import Tortoise
from tortoise.contrib.pydantic import pydantic_model_creator

# Early initialisation of Tortoise ORM Models.
# Initialise the relationships between Models. This does not initialise any database connection.
Tortoise.init_models(["app.models.tortoise"], "models")

# Response model
class ResponseMessage(pydantic.BaseModel):
    detail: str


# Users
class CreateUser(pydantic.BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: pydantic.SecretStr

class LogoutRequest(pydantic.BaseModel):
    device_id : str

User_Pydantic = pydantic_model_creator(
    Users,
    name="User",
    exclude=("hashed_password", "confirmation", "working_hours", "device_login_statusses", "reported_maintenance_issues"),
)


# Roles

RolesSchema = pydantic_model_creator(Roles, name="Role", exclude=["id", "users"])


#  Email
class EmailSchema(pydantic.BaseModel):
    recipient_addresses: List[constr(to_lower=True)]
    body: Dict[str, Any]


# Activate Account
class TokenSchema(pydantic.BaseModel):
    token: Optional[str]
    refresh_token: Optional[str]


# Reset password
class ResetPassword(pydantic.BaseModel):
    token: str
    password: pydantic.SecretStr


# Allowed Users
class AllowedUsersCreateSchema(pydantic.BaseModel):
    email: EmailStr


class AllowedUsersUpdateschema(pydantic.BaseModel):
    email: constr(to_lower=True)


AllowedUsersResponseSchema = pydantic_model_creator(AllowedUsers)

# General maintenance
# GET
GeneralMaintenanceResponseSchema = pydantic_model_creator(GeneralMaintenance)
# CREATE
class GeneralMaintenanceCreateSchema(pydantic.BaseModel):
    description: str


# UPDATE
class GeneralMaintenanceUpdateSchema(pydantic.BaseModel):
    description: str


# Working Hours
# GET
WorkingHoursResponseSchema = pydantic_model_creator(WorkingHours, exclude=["user"])
WorkingHoursResponseSchemaComplete = pydantic_model_creator(WorkingHours)

# CREATE
class WorkingHoursCreateSchema(pydantic.BaseModel):
    user_id: int
    date: datetime.date
    hours: int
    milkings : Optional[int]
    description: str


# UPDATE
class WorkingHoursUpdateSchema(pydantic.BaseModel):
    id: Optional[int]
    user_id: Optional[int]
    date: Optional[datetime.date]
    hours: Optional[float]
    milkings : Optional[float]
    description: Optional[str]
    submitted: Optional[bool] = False


# UPDATE
class WorkingHoursSubmitSchema(pydantic.BaseModel):
    ids: List[int]


# ADMIN WORKING HOURS
class WeekResult(pydantic.BaseModel):
    user_id: int
    name: str
    sum_hours: float
    sum_milkings: float
    submitted: bool
    working_hours: List[WorkingHoursResponseSchema]


class WeeksNotSubmittedAllUsersResponseSchema(pydantic.BaseModel):
    year: int
    week: int
    week_start: datetime.date
    week_end: datetime.date
    employee_info: List[WeekResult]


class WeekData(pydantic.BaseModel):
    year: int
    week: int
    week_start: datetime.date
    week_end: datetime.date
    working_hours: List[WorkingHoursResponseSchema]
    sum_hours: float
    sum_milkings : float
    submitted: bool


class WeeksNotSubmittedSingleUsersResponseSchema(pydantic.BaseModel):

    week_data: List[WeekData]
    werknemer: User_Pydantic


# Bouwplan
class BouwPlanDataModelIn(pydantic.BaseModel):
    ha: float
    link: str
    gewas: str
    opmerking: str
    perceel_nummer: str
    ingetekend_door: str
    werknaam: str
    mest: Optional[str]


class BouwPlanDataModelOut(pydantic.BaseModel):
    ha: float
    link: str
    gewas: str
    opmerking: str
    perceel_nummer: str
    werknaam: str
    ingetekend_door: str
    mest: Optional[str]
    year: int
    created_at: datetime.date

    class Config:
        orm_mode = True


# Machines
#  Add a machine
class MachineCreateSchema(pydantic.BaseModel):
    work_number: Optional[str]
    work_name: Optional[str]
    category: Optional[str]
    group: Optional[str]
    brand_name: Optional[str]
    type_name: Optional[str]
    licence_number: Optional[str]
    chassis_number: Optional[str]
    construction_year: Optional[str]
    ascription_code: Optional[str]

class MachineBaseInfo(pydantic.BaseModel):
    id : Optional[int]
    work_number: Optional[str]
    work_name: Optional[str]
    category: Optional[str]
    group: Optional[str]
    brand_name: Optional[str]
    type_name: Optional[str]
    licence_number: Optional[str]
    chassis_number: Optional[str]
    construction_year: Optional[str]
    ascription_code: Optional[str]

class MainetenanceIssueInfo(pydantic.BaseModel):
    id: int
    created_at : Optional[datetime.datetime]
    created_by : Optional[str]
    issue_description: Optional[str]
    status: Optional[str]
    priority: Optional[str]

class TankTransactionInfo(pydantic.BaseModel):
    id: int
    vehicle: Optional[str]
    driver: Optional[str]
    transaction_type: Optional[str]
    acquisition_mode: Optional[str]
    transaction_status: Optional[str]
    start_date_time: Optional[datetime.datetime]
    transaction_number: Optional[int]
    product: Optional[str]
    quantity: Optional[float]
    transaction_duration: Optional[str]
    meter: Optional[str]
    meter_type: Optional[str]

MachineResponseSchema = pydantic_model_creator(Machines)

class SingleMachineDataReponse(pydantic.BaseModel):
    info : MachineBaseInfo
    maintenance_issues : Optional[List[MainetenanceIssueInfo]]
    tank_transactions : Optional[List[TankTransactionInfo]]

# Machine maintenance
class MachineMaintenanceCreate(pydantic.BaseModel):
    issue_description: Optional[str]
    status: Optional[str]
    machine_id: Optional[int]


class MachineMaintenanceUpdate(pydantic.BaseModel):
    id: int
    issue_description: Optional[str]
    status: Optional[str]
    machine_id: Optional[int]
    priority: Optional[str]


MachineMaintenanceResponseSchema = pydantic_model_creator(MaintenanceMachines)


def datetime_converter(v:str) -> datetime.datetime:
    print(v)
    return datetime.datetime.strptime(v,'%d/%m/%Y %H:%M:%S')
class TankTransactionCreate(pydantic.BaseModel):
    vehicle: Optional[str]
    driver: Optional[str]
    transaction_type: Optional[str]
    acquisition_mode: Optional[str]
    transaction_status: Optional[str]
    start_date_time: Optional[datetime.datetime]
    transaction_number: Optional[int]
    product: Optional[str]
    quantity: Optional[float]
    transaction_duration: Optional[str]
    meter: Optional[str]
    meter_type: Optional[str]
    _transform_start_date_Time = validator('start_date_time', pre=True, allow_reuse=True)(datetime_converter)



TankTransactionResponseSchema = pydantic_model_creator(TankTransactions)

