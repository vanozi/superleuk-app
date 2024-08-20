
import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { setActivePinia, createPinia } from 'pinia'


const pinia = createPinia()
setActivePinia(pinia)


// Load the base URL from the environment variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL as string

// Create an Axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.withCredentials = true
    // You can add custom logic here, such as adding authorization headers
    const token = localStorage.getItem('access_token') // Example: get token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error)
  }
)

// Response interceptor
let isRefreshing = false

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Check if the response was a 401 Unauthorized error
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (!isRefreshing) {
        isRefreshing = true

        try {
          // Attempt to refresh the token
          const response = await apiClient.get('/api/v2/auth/refresh', {
            withCredentials: true, // Send cookies with this request
          })

          // If successful, update the access token and retry the original request
          const newAccessToken = response.data.access_token
          // Store the new token, or set it in a header if needed
          localStorage.setItem('access_token', newAccessToken)
          // Retry original request with the new access token
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return apiClient(originalRequest)
        } catch (refreshError:any) {
          // If refresh fails, redirect to the login page
          if (refreshError.response && refreshError.response.status !== 200) {
             window.location.href = '/auth/login'
          }
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      }
    }

    return Promise.reject(error)
  }
)

