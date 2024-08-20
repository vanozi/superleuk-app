// plugins/axios-client.ts
import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string // Replace with your base URL

let isRefreshing = false

export default defineNuxtPlugin((nuxtApp) => {
  // Create Axios instance
  const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })

  // Request interceptor to add the authorization header
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('access_token') // Get the access token
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor for handling token refresh and retries
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config

      // Handle 401 Unauthorized errors
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        if (!isRefreshing) {
          isRefreshing = true

          try {
            // Refresh the token using the refresh endpoint
            const response = await apiClient.get('/auth/refresh', {
              withCredentials: true, // Make sure cookies are sent
            })

            // Update the new access token in localStorage
            const newAccessToken = response.data.access_token
            localStorage.setItem('access_token', newAccessToken)

            // Retry the original request with the new access token
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
            return apiClient(originalRequest)
          } catch (refreshError) {
            // Redirect to login if refresh fails
            const router = useRouter()
            router.push('/auth/login')
            return Promise.reject(refreshError)
          } finally {
            isRefreshing = false
          }
        }
      }

      return Promise.reject(error)
    }
  )

  // Inject the axios client into the Nuxt app context
  nuxtApp.provide('apiClient', apiClient)
})
