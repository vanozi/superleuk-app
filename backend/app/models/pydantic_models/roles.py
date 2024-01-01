from pydantic import BaseModel
import datetime


class RoleResponse(BaseModel):
    id: int
    created_at: datetime.datetime
    last_modified_at: datetime.datetime
    name: str
    description: str


class RoleInUserResponse(BaseModel):
    name: str
    description: str
