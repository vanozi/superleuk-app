import { useAuthStore } from '~/stores/auth-store'

export default defineNuxtRouteMiddleware((to,from) => {

  const authStore = useAuthStore()
  if (!authStore.loggedInUserHasRole('admin')) {
    return navigateTo('/auth/login')
  }
})
