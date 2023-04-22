import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("Admin login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate("/auth/login");
  const homePage = await loginPage.login("admin@admin.com", "admin");
  await homePage.checkNotification(
    homePage.loginSuccessNotification,
    "Je bent ingelogd"
  );
  await homePage.closeBrowser();
});

// <div class="q-notifications__list q-notifications__list--bottom fixed column no-wrap items-center">
//   <div
//     class="q-notification row items-stretch q-notification--standard bg-positive text-white q-notification--bottom-leave-active q-notification--bottom-move q-notification--bottom-leave-to"
//     role="alert"
//     style="left: 552px; width: 175.172px; height: 48px;"
//   >
//     <div class="q-notification__wrapper col relative-position border-radius-inherit row items-center">
//       <div class="q-notification__content row items-center col">
//         <i
//           class="q-icon notranslate material-icons q-notification__icon q-notification__icon--additional"
//           aria-hidden="true"
//           role="img"
//         >
//           done
//         </i>
//         <div class="q-notification__message col">Je bent ingelogd</div>
//       </div>
//     </div>
//   </div>
// </div>;
