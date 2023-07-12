import logging, os, json

from fastapi import FastAPI
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import Response

from app.api import (
    allowed_users,
    auth,
    roles,
    user_roles,
    users,
    working_hours,
    bouwplan,
    machines,
    machine_onderhoud,
    tank_transactions,
    ionic,
    vakanties
)
from app.db import init_db

log = logging.getLogger("uvicorn")


def create_application() -> FastAPI:
    # # middleware
    # origins_str = os.getenv("ALLOWED_ORIGINS")
    # origins = json.loads(origins_str) if origins_str else ["*"]
    middleware = [Middleware(
        CORSMiddleware,
        allow_origin_regex=r"https?://(?:\w+\.)?gebroedersvroege\.nl",
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )]

    application = FastAPI(middleware=middleware)
    # load router into application
    application.include_router(auth.router, prefix="/api/auth", tags=["auth"])
    application.include_router(users.router, prefix="/api/users", tags=["users"])
    application.include_router(
        allowed_users.router, prefix="/api/allowed_users", tags=["allowed_users"]
    )
    application.include_router(roles.router, prefix="/api/roles", tags=["roles"])
    application.include_router(
        user_roles.router, prefix="/api/user_roles", tags=["user_roles"]
    )
    application.include_router(
        bouwplan.router, prefix="/api/bouwplan", tags=["bouwplan"]
    )
    application.include_router(
        machines.router, prefix="/api/machines", tags=["machines"]
    )
    application.include_router(
        machine_onderhoud.router,
        prefix="/api/machine_maintenance_issues",
        tags=["machine_maintenance_issues"],
    )
    application.include_router(
        tank_transactions.router,
        prefix="/api/tank_transactions",
        tags=["tank_transactions"],
    )
    application.include_router(
        working_hours.router, prefix="/api/working_hours", tags=["working_hours"]
    )
    application.include_router(ionic.router, prefix="/api/ionic", tags=["ionic-test"])
    application.include_router(vakanties.router, prefix="/api/vakanties", tags=["vakanties"])

    return application


app = create_application()


@app.on_event("startup")
async def startup_event():
    log.info("Starting up...")
    init_db(app)


@app.on_event("shutdown")
async def shutdown_event():
    log.info("Shutting down...")

