from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse

from app.tasks import example_task


router = APIRouter()


@router.post("/tasks", status_code=201)
def run_task():
    # Trigger the task asynchronously using Celery
    task = example_task.delay()
    return JSONResponse({"task_id": task.id, "status": "Task submitted"})
