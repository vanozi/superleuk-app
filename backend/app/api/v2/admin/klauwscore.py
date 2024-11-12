from typing import List
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from app.services.v2.auth import RoleChecker
from app.models.pydantic_models.klauwscore import KlauwScoreBase
from app.models.tortoise import KlauwScore
from starlette.responses import JSONResponse
from app.services.v2.klauwscore.klauwscore import download_klauwscore_data
from app.services.v2.klauwscore.utils.parse_functions import parse_klauwscore_tabel
from fastapi.responses import StreamingResponse  # Add to Top
import pandas as pd

router = APIRouter()


@router.post(
    "/",
)
async def upload_latest_scrape():
    tabel = await download_klauwscore_data()
    df = parse_klauwscore_tabel(tabel)
    # Convert DataFrame to list of dictionaries
    df_reset = df.reset_index()  # This will convert the index to a column
    data = df_reset.to_dict("records")
    print(data)
    try:
        for klauwscore in data:
            await KlauwScore.get_or_create(
                koenummer=klauwscore["koenummer"],
                behandeldatum=klauwscore["behandeldatum"],
                notatie=klauwscore["notatie"],
            )
        return JSONResponse(content={"detail": "Klauwscores toegevoegd"})
    except Exception as e:
        return HTTPException(
            status_code=500, detail={"detail": f"Er is iets misgegaan: {e}"}
        )


@router.get("/", response_model=List[KlauwScoreBase])
async def get_klauwscores(
    koenummer: str = None,
    behandeldatum_start: str = None,
    behandeldatum_end: str = None,
):
    try:
        query = {}
        if koenummer:
            query["koenummer"] = koenummer
        if behandeldatum_start and behandeldatum_end:
            query["behandeldatum__gte"] = behandeldatum_start
            query["behandeldatum__lte"] = behandeldatum_end
        klauwscores = await KlauwScore.filter(**query).all()
        return klauwscores
    except Exception as e:
        return HTTPException(
            status_code=500, content={"detail": f"Er is iets misgegaan: {e}"}
        )


@router.get("/csv")
async def download_klauwscores(background_tasks: BackgroundTasks):
    tabel = await download_klauwscore_data()
    df = parse_klauwscore_tabel(tabel)
    # background task to update the database
    # background_tasks.add_task(split_notatie_and_expand(df))
    df_expanded = split_notatie_and_expand(df)
    list = df_expanded.to_dict(orient="records")
    await KlauwScore.all().delete()
    for item in list:
        await KlauwScore.get_or_create(
            koenummer=item["koenummer"],
            behandeldatum=item["behandeldatum"],
            notatie=item["notatie"],
        )
    df["notatie"] = df["notatie"].str.replace("-", "")
    df["notatie"] = df["notatie"].str.lstrip()

    return StreamingResponse(
        iter([df.to_csv(index=False)]),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename=klauwscore.csv"},
    )


# Define a function to handle the splitting and creation of new rows
def split_notatie_and_expand(df):
    # First, strip any leading/trailing whitespace from the notatie column
    df["notatie"] = df["notatie"].str.strip()

    # Function to split the 'notatie' and remove empty parts
    def split_notation(notatie):
        return [part.strip() for part in notatie.split("-") if part.strip()]

    # Expanding rows by applying the split function
    expanded_rows = []

    for idx, row in df.iterrows():
        notatie_parts = split_notation(row["notatie"])  # Split and clean
        for part in notatie_parts:
            new_row = row.copy()  # Copy the original row
            new_row["notatie"] = part  # Set the 'notatie' to the individual part
            expanded_rows.append(new_row)

    # Create a new DataFrame from the expanded rows
    return pd.DataFrame(expanded_rows)
