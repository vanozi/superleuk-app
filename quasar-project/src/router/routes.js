const routes = [
  {
    path: "/",
    component: () => import("src/layouts/Default.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
    meta: { requiresAuth: true },
  },
  {
    path: "/werkplaats",
    component: () => import("src/layouts/Default.vue"),
    children: [{ path: "tankoverzicht", component: () => import("src/features/werkplaats/pages/TankOverzicht.vue") }],
  },
  {
    path: "/auth",
    component: () => import("src/layouts/NoAuth.vue"),
    children: [
      {
        path: "login",
        component: () => import("src/features/auth/pages/LoginPage.vue"),
      },
    ],
    meta: { requiresAuth: false },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
