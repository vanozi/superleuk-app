import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
    meta: { requiresAuth: true },
  },
  // auth
  {
    path: '/auth',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/auth/LoginPage.vue') },
    ],
  },
  // werkplaats
  {
    path: '/werkplaats',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/werkplaats/IndexPage.vue') },
      {
        path: 'machines',
        component: () => import('pages/werkplaats/MachinesPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
