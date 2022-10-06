import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../pages/HomePage.vue'
import UserAuthPage from '../pages/auth/UserAuthPage.vue'

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
    path: '/auth',
    component : UserAuthPage
  },
  // Memories example pages
  // {
  //   path: '/memories',
  //   component: MemoriesPage
  // },
  // {
  //   path: '/memories/:id',
  //   component : () => import('../pages/MemoryDetailsPage.vue')
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
