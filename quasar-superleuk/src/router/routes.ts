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
        component: () => import('src/views/auth/LoginView.vue'),
      },
      {
        path: 'forgot-password',
        component: () => import('src/views/auth/ForgotPasswordPage.vue'),
      },
      {
        path: 'reset_password/:token',
        component: () => import('src/views/auth/ResetPasswordPage.vue'),
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
        path: '',
        component: () => import('src/views/uren/IndexView.vue'),
      },
      {
        path: 'invoeren',
        component: () => import('src/views/uren/HourRegistrationView.vue'),
      },
      {
        path: 'overzicht',
        component: () => import('src/views/uren/HoursOverviewView.vue'),
      },
    ],
  },
  // boerderij kalender routes
  {
    path: '/boerderij-kalender',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/views/boerderij-kalender/IndexView.vue'),
      },
    ],
  },
  // admin routes
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAdmin: true },
    children: [
      // medewerkers paginas
      {
        path: 'medewerkers',
        component: () => import('src/views/admin/MedewerkersView.vue'),
      },
      {
        path: 'medewerkers/:id',
        name: 'admin-medewerker-profile',
        component: () => import('src/views/admin/MedewerkerProfileView.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/views/error-pages/ErrorNotFound.vue'),
  },
];

export default routes;
