import asyncio
from datetime import datetime
from typing import List
from playwright.async_api import async_playwright
from pprint import pprint

from pydantic import BaseModel


class KoeBase(BaseModel):
    birth_date: datetime
    oornummer: str
    oornummer_kort: str
    haarkleur: str
    naam: str
    halsband_nummer: int
    geslacht: str


# De functie om een enkele response naar het Pydantic-model te mappen
def map_response_to_koe_base(response):
    koe_data = {
        "birth_date": datetime.strptime(response["birthDate"], "%Y-%m-%dT%H:%M:%S.%f"),
        "oornummer": response["eartag"],
        "oornummer_kort": response["eartagShort"],
        "haarkleur": response.get("hairColor", "Onbekend"),
        "naam": response["name"],
        "halsband_nummer": response["number"],
        "geslacht": response["sex"],
    }

    # Een instantie van KoeBase maken
    koe = KoeBase(**koe_data)
    return koe


# Functie om een lijst van response items te mappen naar het KoeBase model
def map_list_of_responses_to_koe_base(response_list: List[dict]):
    return [map_response_to_koe_base(response) for response in response_list]


async def verwerk_stallijst_gegevens(response):
    if response.url.endswith("herdregistration"):
        try:
            # Try to extract and print the JSON response
            stallijst = await response.json()
            geconverteerde_stallijst = map_list_of_responses_to_koe_base(
                stallijst["itemList"]
            )
            pprint(geconverteerde_stallijst)
        except Exception as e:
            # If the response is not JSON, fallback to text
            print(e)


async def scrape_stallijst() -> None:
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()

        # Attach the response handler to capture responses
        page.on("response", verwerk_stallijst_gegevens)  # No 'await' here

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


def main():
    asyncio.run(scrape_stallijst())


if __name__ == "__main__":
    main()
