from pydantic import BaseModel
import datetime


class KlauwScoreBase(BaseModel):
    koenummer: str
    behandeldatum: datetime.date
    notatie: str
