import datetime
from tortoise.functions import Min

from pydantic.typing import NoneType
from isoweek import Week
import os
from typing import List

from app.helpers.date_functions import daterange
from app.models.pydantic import (WeeksNotSubmittedAllUsersResponseSchema,
                                 WorkingHoursCreateSchema,
                                 WorkingHoursResponseSchema,
                                 WorkingHoursSubmitSchema,
                                 WorkingHoursUpdateSchema)
from app.models.tortoise import Users, WorkingHours
from app.services.auth import RoleChecker, get_current_active_user
from fastapi import APIRouter, HTTPException
from fastapi.param_functions import Depends
from starlette import status
from starlette.responses import JSONResponse
from starlette.routing import request_response

router = APIRouter()

# CRUD Implementation for general maintenace

# Create working hours for current active user
@router.post("/", response_model=WorkingHoursResponseSchema, status_code=201)
async def post_working_hours(
    working_hour_payload: WorkingHoursCreateSchema,
    current_active_user=Depends(get_current_active_user),
) -> WorkingHoursResponseSchema:
    # lookup the user for whom the hours are submitted
    user = await Users.get_or_none(id=working_hour_payload.user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="De gebruiker waarvoor de uren zijn ingediend is niet bekend"
        )
    # Check if there is allready an item for the booking date
    item_exists = await WorkingHours.filter(date=working_hour_payload.date).first()
    if item_exists is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Voor deze dag zijn al uren geboekt"
        ) 
    # Add working hour to the database
    try:
        working_hours_item = await WorkingHours.create(
            hours=working_hour_payload.hours,
            date=working_hour_payload.date,
            description=working_hour_payload.description,
            created_by=current_active_user.email,
            last_modified_by=current_active_user.email,
            user = user
        )
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Er is een overwachte fout opgetreden, neem contact op met de beheerder",
        )
    return working_hours_item


# Read all maintenace issues (Only the admin can do this)
@router.get(
    "/all_for_user/{user_id}",
    response_model=List[WorkingHoursResponseSchema],
    dependencies=[Depends(get_current_active_user)],
)
async def get_working_hours_for_user(user_id : str):
    # lookup the user for whom the hours are submitted
    user = await Users.get_or_none(id=user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="De gebruiker waarvoor de uren zijn ingediend is niet bekend"
        )
    await user.fetch_related('working_hours')
    return list(user.working_hours)


# Read single working_hours item
@router.get(
    "/{id}",
    response_model=WorkingHoursResponseSchema,
    dependencies=[Depends(get_current_active_user)],
)
async def get_single_working_hours(id: int):
    working_hours_item = await WorkingHours.get_or_none(id=id)
    if working_hours_item is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Dit object komt niet voor in de database",
        )
    else:
        return working_hours_item


# Update working hours item
@router.put("/", dependencies=[Depends(get_current_active_user)])
async def update_working_hours_item(
    working_hours_issue_to_update: WorkingHoursUpdateSchema,
    current_active_user=Depends(get_current_active_user),
):
    working_hours_item = await WorkingHours.get_or_none(id=working_hours_issue_to_update.id)
    # if the working item cannot be found then we assume the user want to create a new one
    if working_hours_item is None:
        # lookup the user for whom the hours are submitted
        user = await Users.get_or_none(id=working_hours_issue_to_update.user_id)
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="De gebruiker waarvoor de uren zijn ingediend is niet bekend"
            )
        # Add working hour to the database
        try:
            working_hours_item = await WorkingHours.create(
                **working_hours_issue_to_update.dict(),
                created_by=current_active_user.email,
                last_modified_by=current_active_user.email,
                user = user
            )
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Er is een overwachte fout opgetreden, neem contact op met de beheerder",
            )
        return working_hours_item
    else:
        if working_hours_issue_to_update.description is not None:
            working_hours_item.description = working_hours_issue_to_update.description
        if working_hours_issue_to_update.hours is not None:
            working_hours_item.hours = working_hours_issue_to_update.hours
        if working_hours_issue_to_update.submitted is not None:
            working_hours_item.submitted = working_hours_issue_to_update.submitted
        await working_hours_item.save()
        return working_hours_item

# Delete working hours item
@router.delete("/{id}", dependencies=[Depends(get_current_active_user)])
async def delete_working_hours_item(id: int):
    working_hours_item = await WorkingHours.get_or_none(id=id)
    if working_hours_item is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Dit object komt niet voor in de database",
        )
    else:
        await working_hours_item.delete()
        # Create a success respons
        return JSONResponse({"detail": "Uren succesvol verwijderd"}, status_code=200)


# admin routes
# Get weeks not submitted for all users in timerange
@router.get(
    "/admin/weeks_not_submitted",
    response_model=List[WeeksNotSubmittedAllUsersResponseSchema],
    dependencies=[Depends(RoleChecker(['admin']))]
)
async def get_weeks_not_submitted(from_date:datetime.date, to_date:datetime.date
):

    # Create a list of week numbers for the date range
    week_numbers_from_date_range = list(dict.fromkeys([( x.isocalendar()[0], x.isocalendar()[1]) for x in daterange(from_date, to_date)]))
    for item in week_numbers_from_date_range:
        weekday_start = Week(item[0], item[1]).monday()

    # create a list of users with role werknemer
    werknemers = []
    users = await Users.all().filter(is_active=True)
    for user in users:
        await user.fetch_related('roles', 'working_hours')
        for role in user.roles:
            if role.name == 'werknemer':
                werknemers.append(user)
    # loop over weeks and collect data
    not_submitted_list = []
    for item in week_numbers_from_date_range:
        year = item[0]
        week_number = item[1]
        week_start = Week(item[0], item[1]).monday()
        week_end = Week(item[0], item[1]).sunday()
        not_submitted = []
        for werknemer in werknemers:
            working_hours_item = await werknemer.working_hours.filter(date=week_start)
            not_submitted.append(werknemer) if working_hours_item == [] and werknemer.created_at.date()<week_start else False
            for i in working_hours_item:
                not_submitted.append(werknemer) if i.submitted == False else False
        not_submitted_list.append({'year':year, 'week':week_number, 'week_start':datetime.date.strftime(week_start, '%Y-%m-%d'), 'week_end':datetime.date.strftime(week_end, '%Y-%m-%d'), 'not_submitted':not_submitted})
    return not_submitted_list
                

