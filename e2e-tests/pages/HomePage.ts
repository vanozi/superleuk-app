import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly loginSuccessNotification: Locator;

  constructor(page: Page) {
    super(page);
    this.loginSuccessNotification = this.page.locator(
      'xpath=//div[contains(text(), "Je bent ingelogd")]'
    );
  }
}
