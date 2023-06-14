import { Locator, Page, expect } from "@playwright/test";
import { config } from "dotenv";
config();

export class BasePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async navigate(path: string) {
    await this.page.goto(process.env.BASE_URL + path);
  }

  async checkNotification(locator: Locator, message: string) {
    expect(locator).toContainText(message);
  }

  async closeBrowser() {
    await this.page.close();
  }
}
