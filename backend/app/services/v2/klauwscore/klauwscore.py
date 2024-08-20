import os
import requests
from playwright.async_api import async_playwright
from app.services.v2.klauwscore.page_objects.login_page import (
    LoginPage as KlauwscoreLoginPage,
)
from app.services.v2.klauwscore.utils.parse_functions import parse_klauwscore_tabel
from lxml import html as lh  # Assuming you are using lxml for HTML parsing


async def download_klauwscore_data():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Go to the login page
        await page.goto("http://klauwscore.nl/login")

        # Fill in the username and password
        await page.locator(KlauwscoreLoginPage.username_input).fill(
            os.getenv("USERNAME_KLAUWSCORE")
        )
        await page.locator(KlauwscoreLoginPage.password_input).fill(
            os.getenv("PASSWORD_KLAUWSCORE")
        )

        # Click on the login button
        await page.locator(KlauwscoreLoginPage.submit_button).click()

        # Navigate to the stallijst page
        await page.goto("http://klauwscore.nl/veepedicure/stallijst")

        # Extract the stallijst HTML
        stallijst_tabel = await page.inner_html("//div[@class='account-wrapper']")

        # Close the browser
        await browser.close()

        # Return the parsed HTML fragment
        return lh.fragment_fromstring(stallijst_tabel)
