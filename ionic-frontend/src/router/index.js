import { createRouter, createWebHistory } from '@ionic/vue-router';
import MemoriesPage from '../pages/MemoriesPage.vue'
// import UserAuth from '../pages/auth/UserAuth.vue'
import HomePage from '../pages/HomePage.vue'
import HomePage2 from '../pages/HomePage2.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/home2',
    component: HomePage2
  },
  {
    path: '/memories',
    component: MemoriesPage
  },
  // auth routes
  // {
  //   path: '/auth',
  //   component: UserAuth
  // },

  // {
  //   path: '/',
  //   redirect: '/auth'
  // },
  // {
  //   path: '/memories',
  //   component:MemoriesPage
  // },
  // {
  //   path: '/memories/:id',
  //   component : () => import('../pages/MemoryDetailsPage.vue')
  // },
  // {
  //   path: '/memories/add',
  //   component : () => import('../pages/AddMemoryPage.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
