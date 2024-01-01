from pydantic import BaseeModel, validator
import datetime
from typing import Optional
from app.models.pydantic_models.users import UserResponse


class VakantieRequest(pydantic.BaseModel):
    start_date: datetime.date
    end_date: datetime.date

    @validator("end_date")
    def end_date_must_be_greater_than_start_date(cls, v, values):
        if "start_date" in values and v < values["start_date"]:
            raise ValueError("eind datum moet groter zijn dan start datum")
        return v


class VakantieResponse(pydantic.BaseModel):
    id: int
    created_at: Optional[datetime.datetime]
    last_modified_at: Optional[datetime.datetime]
    start_date: Optional[datetime.date]
    end_date: Optional[datetime.date]
    user: UserResponse

    class Config:
        orm_mode = True
