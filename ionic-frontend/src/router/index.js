import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../pages/HomePage.vue'
import UserAuthPage from '../pages/auth/UserAuthPage.vue'
import WorkingHours from '../components/working-hours/WorkingHours.vue'
import WeekViewComponent from '../components/working-hours/WeekViewComponent.vue'

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
  {
    path: '/uren',
    // You could also have named views at tho top
    component: WorkingHours,
    children: [
      {
        path: 'invoeren',
        component: WeekViewComponent,
      },
      // {
      //   path: 'profile',
      //   components: {
      //     default: UserProfile,
      //     helper: UserProfilePreview,
      //   },
      // },
    ],
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
