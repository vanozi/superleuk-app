import asyncio
import os
from typing import Callable
from celery import Celery
from tortoise import Tortoise

from app.config import settings


def create_celery():
    celery = Celery(
        __name__,
        broker="redis://:eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81@redis:6379/0",
        backend="redis://:eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81@redis:6379/0",
    )

    return celery


celery_app = create_celery()
celery_app.autodiscover_tasks(["app.tasks.tasks"])


async def wrap_db_ctx(func: Callable, *args, **kwargs) -> None:
    try:
        await Tortoise.init(
            db_url=os.environ.get("DATABASE_URL"),
            modules={"models": ["app.models.tortoise"]},
        )

        await func(*args, **kwargs)
    finally:
        await Tortoise.close_connections()


def async_to_sync(func: Callable, *args, **kwargs) -> None:
    asyncio.run(wrap_db_ctx(func, *args, **kwargs))
