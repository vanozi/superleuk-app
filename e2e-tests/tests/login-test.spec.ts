import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("Admin login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate("/auth/login");
});
