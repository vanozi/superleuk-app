import logging
import os

from fastapi import FastAPI
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

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
    vakanties,
)
from app.api.v2 import allowed_users, auth, working_hours, users
from app.api.v2.admin import working_hours as admin_working_hours
from app.db import init_db

log = logging.getLogger("uvicorn")


def create_application() -> FastAPI:
    origin_regex = os.getenv("ORIGIN_REGEX", ".*")
    middleware = [
        Middleware(
            CORSMiddleware,
            allow_origin_regex=rf"{origin_regex}",
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
    ]

    application = FastAPI(middleware=middleware)

    # Api voor de nuxt frontend
    app_v1 = FastAPI()
    app_v1.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
    app_v1.include_router(users.router, prefix="/api/v1/users", tags=["users"])
    app_v1.include_router(
        allowed_users.router, prefix="/api/v1/allowed_users", tags=["allowed_users"]
    )
    app_v1.include_router(roles.router, prefix="/api/v1/roles", tags=["roles"])
    app_v1.include_router(
        user_roles.router, prefix="/api/v1/user_roles", tags=["user_roles"]
    )
    app_v1.include_router(
        working_hours.router, prefix="/api/v1/working_hours", tags=["working_hours"]
    )
    app_v1.include_router(bouwplan.router, prefix="/api/v1/bouwplan", tags=["bouwplan"])
    app_v1.include_router(machines.router, prefix="/api/v1/machines", tags=["machines"])
    app_v1.include_router(
        machine_onderhoud.router,
        prefix="/api/v1/machine_maintenance_issues",
        tags=["machine_maintenance_issues"],
    )
    app_v1.include_router(
        tank_transactions.router,
        prefix="/api/tank_transactions",
        tags=["tank_transactions"],
    )
    app_v1.include_router(
        vakanties.router, prefix="/api/v1/vakanties", tags=["vakanties"]
    )
    application.mount("/api/v1", app_v1)

    # Api voor de quasar frontend
    app_v2 = FastAPI()

    app_v2.include_router(auth.router, prefix="/auth", tags=["auth"])
    app_v2.include_router(
        allowed_users.router, prefix="/allowed_users", tags=["allowed_users"]
    )
    app_v2.include_router(users.router, prefix="/users", tags=["users"])

    app_v2.include_router(
        working_hours.router, prefix="/working_hours", tags=["working_hours"]
    )

    # Admin routes
    app_v2.include_router(
        admin_working_hours.router,
        prefix="/admin/working_hours",
        tags=["admin_working_hours"],
    )

    application.mount("/api/v2", app_v2)

    return application


app = create_application()


@app.on_event("startup")
async def startup_event():
    log.info("Starting up...")
    init_db(app)


@app.on_event("shutdown")
async def shutdown_event():
    log.info("Shutting down...")
