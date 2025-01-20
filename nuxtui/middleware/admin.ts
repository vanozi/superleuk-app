import { useAuthStore } from '~/stores/auth-store'

export default defineNuxtRouteMiddleware(() => {

  const authStore = useAuthStore()
  if (!authStore.loggedInUserHasRole('admin')) {
    return navigateTo('/auth/login')
  }
})
