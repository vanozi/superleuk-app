import { useAuthStore } from '~/stores/auth-store'

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()
  console.log('redirect-admin.ts middleware')

  // Only apply this logic to the index page ("/")
    // Check if the user is authenticated and has the admin role
    if (authStore.loggedIn && authStore.loggedInUserHasRole('admin')) {
      console.log(authStore.loggedIn)
      console.log(authStore.loggedInUser)
      // Redirect the user to the admin page
      return navigateTo('/admin')
    }

})
