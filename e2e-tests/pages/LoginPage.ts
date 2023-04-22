import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { HomePage } from "./HomePage";

export class LoginPage extends BasePage {
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

  async login(email: string, password: string): Promise<HomePage> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    return new HomePage(this.page);
  }
}
