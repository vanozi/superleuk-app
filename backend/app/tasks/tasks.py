from app.services.v2.celery_utils import async_to_sync, celery_app
from app.api.v2.admin.klauwscore import upload_latest_scrape
from app.tasks.uniform import scrape_stallijst


@celery_app.task
def example_task():
    async_to_sync(upload_latest_scrape)


@celery_app.task
def scrape_uniform_stallijst_task():
    async_to_sync(scrape_stallijst)
