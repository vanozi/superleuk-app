import { createRouter, createWebHistory } from '@ionic/vue-router';
// import UserHome from '../views/Users/UserHome'
// import UserProfile from '../views/Users/UserProfile'
// import UserIndex from '../views/Users/UserIndex'
import HomeView from '../views/HomeView'
// import UrenView from '../views/UrenView.vue'
// import UrenHome from '../components/uren/UrenHome.vue'
// import UrenInvoer from '../views/Uren/UrenInvoer.vue'
import UrenInvoerOptions from '../views/Uren/UrenInvoerOptions.vue'
import UrenOverzicht from '../views/Uren/UrenOverzicht.vue'
import LoginView from '../views/Auth/LoginView.vue'
import store from '../store'

// middleware
// import auth from '../middleware/auth';

const routes = [
  // user auth
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    redirect: '/home',
  },
  // {
  //   path: '/user',
  //   component: UserIndex,
  //   children: [
  //     // UserHome will be rendered inside User's <router-view>
  //     // when /user/:id is matched
  //     { path: '', components: { userhome: UserHome } },

  //     // ...other sub routes
  //     { path: 'profile', components: { userprofile: UserProfile } },
  //   ],
  // },
  { path: '/uren', component:  UrenOverzicht,  meta: { requiresAuth: true } },
  { path: '/uren/invoeren', component: UrenInvoerOptions, meta: { requiresAuth: true } }
]


// children: [
//   // UserHome will be rendered inside User's <router-view>
//   // when /user/:id is matched
//   { path: '', components: { urenhome: UrenHome } },

//   // ...other sub routes
//   { path: 'invoeren', components: { ureninvoeren: UrenInvoer }, meta: { requiresAuth: true } },
//   { path: 'overzicht', components: { urenoverzicht: UrenOverzicht }, meta: { requiresAuth: true } },
// ],
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router guards
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.auth.user == null) {
      next({ name: 'login' })
    }
    else {
      next();
    }
  }
  else {
    next();
  }
});

export default router
