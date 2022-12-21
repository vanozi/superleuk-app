import { LocalStorage } from "quasar";
import { route } from "quasar/wrappers";
import { useUserStore } from "src/stores/user-store";
import { routerToPath } from "src/boot/globalComputed";
import { routerFromPath } from "src/boot/globalComputed";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

let router = null;
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  router = Router

  // router guards
  Router.beforeEach((to, from) => {
    const userStore = useUserStore();
      // Store to and from as global variables
    routerToPath.value = to.path;
    routerFromPath.value = from.path;

    // instead of having to check every route record with
    // to.matched.some(record => record.meta.requiresAuth)
    if (to.meta.requiresAuth && !LocalStorage.getItem("access_token")) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      return {
        path: "/auth/login",
        // save the location we were at to come back later
        query: { redirect: to.fullPath },
      };
    }
  });


  return Router;
});

export {router}
