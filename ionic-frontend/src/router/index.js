import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../pages/HomePage.vue'
import UserAuthPage from '../pages/auth/UserAuthPage.vue'
import WorkingHoursIndex from '../components/working-hours/WorkingHoursIndex.vue'
import WorkingHoursHome from '../components/working-hours/WorkingHoursHome.vue'
// import WeekViewComponent from '../components/working-hours/WeekViewComponent.vue'

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
    component: WorkingHoursIndex,
    children: [
      {
        path: '',
        name : 'hourshome',
        component: WorkingHoursHome,
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
