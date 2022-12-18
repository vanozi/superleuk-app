const routes = [
  {
    path: "/",
    component: () => import("src/layouts/Default.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
    meta: { requiresAuth: true },
  },
  // Werkplaats routes
  {
    path: "/werkplaats",
    component: () => import("src/layouts/Default.vue"),
    children: [
      {
        path: "tankoverzicht",
        component: () =>
          import("src/features/werkplaats/tankoverzicht/pages/TankOverzicht.vue"),
      },
      {
        path: "machines",
        component: () =>
          import("src/features/werkplaats/machines/pages/MachinesView.vue"),
      },
      {
        path: "machine/:id",
        component: () =>
          import("src/features/werkplaats/machines/pages/MachineView.vue"),
      },
      // Storingen
      {
        path: "storingen",
        component: () =>
          import("src/features/werkplaats/storingen/pages/StoringenView.vue"),
      },
      {
        path: "storing/:id",
        component: () =>
          import("src/features/werkplaats/storingen/pages/StoringView.vue"),
      },
    ],
  },
  // Authentication routes
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
  // Posts and Authors example
  {
    path: "/posts-example",
    component: () => import("src/layouts/Default.vue"),
    children: [
      {
        path: "posts",
        component: () =>
          import("src/features/posts-example/pages/PostsView.vue"),
      },
      {
        path: "post/:id",
        name: "post",
        component: () =>
          import("src/features/posts-example/pages/PostView.vue"),
      },
      {
        path: "authors",
        name: "authors",
        component: () =>
          import("src/features/posts-example/pages/AuthorsView.vue"),
      },
      {
        path: "authors",
        name: "authors",
        component: () =>
          import("src/features/posts-example/pages/AuthorsView.vue"),
      },
      {
        path: "author/:username",
        component: () =>
          import("src/features/posts-example/pages/AuthorView.vue"),
      },
    ],
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
