import { useAuthStore } from '~/stores/auth-store'

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()
  console.log('auth.ts middleware')
  console.log(authStore.loggedIn)

  if (!authStore.loggedIn) {
    return navigateTo('/auth/login')
  }
})
