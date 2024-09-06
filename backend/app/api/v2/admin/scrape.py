import time, os
from fastapi import APIRouter
from playwright.async_api import async_playwright


async def wait_for_stable_value(selector, page, timeout=6000, check_interval=1000):
    end_time = time.time() + timeout / 1000
    previous_value = None

    while time.time() < end_time:
        current_value = await page.locator(selector).inner_text()
        stripped_current_value = current_value.strip()
        # reset end time if stable
        if int(stripped_current_value) == 0:
            end_time = time.time() + timeout / 1000
            continue
        if stripped_current_value == previous_value:
            print(f"Value stabilized at: {stripped_current_value}")
            return stripped_current_value

        # Update the previous value and wait for the next check
        previous_value = stripped_current_value
        time.sleep(check_interval / 1000)

    raise Exception("Value did not stabilize within the timeout period.")


router = APIRouter()


@router.get(
    "/gea_stallijst",
)
async def gea_stallijst():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()
        await page.goto("https://vroege.vpu-online.com/login/LoginPage.web")
        await page.get_by_placeholder("Username").click()
        await page.get_by_placeholder("Username").fill("elma")
        await page.get_by_placeholder("Password").click()
        await page.get_by_placeholder("Password").fill("SuperLeuk!")
        await page.get_by_role("button", name="Login").click()
        await page.wait_for_selector("header.application-header")
        await page.get_by_role("link", name=" Rapporten").click()
        await page.get_by_role("link", name="Dieren").click()
        await page.get_by_role("button", name="Ok").click()

        # Wait for the value of the element to stabilize
        stable_value = await wait_for_stable_value(
            'span[data-bind="text: table.data().length"]', page
        )

        await page.get_by_role("button", name="").click()

        async with page.expect_download() as download_info:
            await page.get_by_role("button", name="Downloaden").click()

        download = await download_info.value

        # Get the temporary file path of the download
        download_path = await download.path()

        # Read the content of the file
        with open(download_path, "r", encoding="utf-8") as file:
            file_content = file.read()

        await context.close()
        await browser.close()

        return file_content
