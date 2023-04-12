import type { Page } from "@playwright/test";
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
}
