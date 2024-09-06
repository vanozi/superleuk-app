import asyncio
from fastapi import APIRouter, Depends
from app.services.v2.auth import RoleChecker

from playwright.async_api import async_playwright
import pandas as pd
from sqlalchemy import create_engine

router = APIRouter()


#  Roles


@router.get(
    "/refresh-stallijst",
    dependencies=[Depends(RoleChecker(["admin"]))],
)
async def refresh_stallijst():
    # List to store responses
    responses = []

    # Define a response handler to log and capture responses
    async def log_response(response):
        if response.url.endswith(
            "herdregistration"
        ):  # Check if the request URL matches the API
            try:
                # Since response.text() is async, you need to await it
                body = await response.json()
                responses.append(
                    {
                        "url": response.url,
                        "status": response.status,
                        "body": body,
                    }
                )
            except Exception as e:
                # Handle potential errors when getting the response body
                responses.append(
                    {
                        "url": response.url,
                        "status": response.status,
                        "error": str(e),
                    }
                )

    # Using async_playwright to launch browser
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        # Attach the response handler to capture responses
        page.on(
            "response", lambda response: asyncio.create_task(log_response(response))
        )  # Ensure async handling

        # Perform actions on the page
        await page.goto("https://eu.myherdmanagement.com/login")
        await page.get_by_placeholder("email").click()
        await page.get_by_placeholder("email").fill("info@gebroedersvroege.nl")
        await page.get_by_placeholder("password").click()
        await page.get_by_placeholder("password").fill("ETW-pxa1ngm4amy*huq")
        await page.get_by_role("button", name="Sign in").click()
        await page.get_by_role("gridcell", name="Melkvee").dblclick()
        await page.frame_locator("iframe").locator("#mi100000 div").nth(2).click()
        await (
            page.frame_locator("iframe")
            .locator(
                "div:nth-child(5) > .ua-tile > .overview-tile-icon > div > .ua-icon-w80"
            )
            .click()
        )
        await (
            page.frame_locator("iframe")
            .locator(
                "div:nth-child(2) > .ua-tile > .overview-tile-icon > div > .ua-icon-w80"
            )
            .click()
        )

        await page.wait_for_load_state("networkidle")

        await context.close()
        await browser.close()

        # Create a DataFrame from the itemList
        df = pd.DataFrame(responses[0]["body"]["itemList"])
        df = df.apply(lambda row: {k: v for k, v in row.items() if k != "herd"}, axis=1)

        # Convert the result back to a DataFrame if necessary
        df = pd.json_normalize(df)

        # Now you can use the DataFrame for further processing or analysis
        db_user = "postgres"
        db_password = "postgres"
        db_host = "database"  # This should match the service name in Docker Compose
        db_port = "5432"
        db_name = "dev"

        # Create SQLAlchemy engine
        engine = create_engine(
            f"postgresql+psycopg2://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
        )

        # Write DataFrame to PostgreSQL table
        df.to_sql("stallijst", engine, if_exists="replace", index=False)

    # Return the captured responses
    return {"responses": responses}
