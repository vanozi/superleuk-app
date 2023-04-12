import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/views/IndexView.vue') },
    ],
    meta: { requiresAuth: true },
  },
  // auth
  {
    path: '/auth',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('src/views/auth/LoginPage.vue'),
      },
      {
        path: 'forgot-password',
        component: () => import('src/views/auth/ForgotPasswordPage.vue'),
      },
      {
        path: 'reset_password/:token',
        component: () => import('src/views/auth/ResetPasswordPAge.vue'),
      },
    ],
  },
  // werkplaats
  {
    path: '/werkplaats',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/views/werkplaats/IndexPage.vue'),
      },
      {
        path: 'machines',
        component: () => import('src/views/werkplaats/MachinesPage.vue'),
      },
    ],
  },
  // uren registratie
  {
    path: '/uren',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'invoeren',
        component: () =>
          import('src/views/uren-registratie/HourRegistrationView.vue'),
      },
    ],
  },
  // design pattersn
  {
    path: '/patterns',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'builder',
        component: () => import('src/views/BuilderPatternView.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/views/ErrorNotFound.vue'),
  },
];

export default routes;
