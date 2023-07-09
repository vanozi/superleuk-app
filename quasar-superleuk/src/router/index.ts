import { route } from 'quasar/wrappers';
import { LocalStorage } from 'quasar';
import {
  Router,
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

const createHistory = process.env.SERVER
  ? createMemoryHistory
  : process.env.VUE_ROUTER_MODE === 'history'
  ? createWebHistory
  : createWebHashHistory;

const router: Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
  history: createHistory(process.env.VUE_ROUTER_BASE),
});

// router guards
router.beforeEach((to) => {
  // When logged in and trying to navigate to the login page you get redirected to the home page
  if(to.path=='/auth/login' && LocalStorage.getItem('access_token')){
    return {
      path : '/'
    }
  }
  // When not logged in and trying to access a restricted page you get redirected to the login page
  if (to.meta.requiresAuth && !LocalStorage.getItem('access_token')) {
    return {
      path: '/auth/login',
    };
  }
});

export default route(function (/* { store, ssrContext } */) {
  return router;
});

export { router };