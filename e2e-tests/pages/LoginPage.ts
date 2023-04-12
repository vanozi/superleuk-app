import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginForm: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.getByTestId("login-email");
    this.loginForm = this.page.getByTestId("login-form");
    this.passwordInput = this.page.getByTestId("login-password");
    this.loginButton = this.page.getByTestId("login-form-submit-button");
  }
}
