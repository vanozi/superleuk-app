from datetime import datetime
from pydantic import BaseModel


class KoeBase(BaseModel):
    birth_date: datetime
    oornummer: str
    oornummer_kort: str
    haarkleur: str
    naam: str
    halsband_nummer: int
    geslacht: str
