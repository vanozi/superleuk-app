import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'


import store from '../store';

// create axios instance with a base URL
const baseURL = process.env.VUE_APP_BASE_URL_API;
const instance = axios.create({
  baseURL: baseURL,
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (store.state.auth.accessToken != null) {
      config.headers.Authorization = `Bearer ${store.state.auth.accessToken}`;
    }
    return config;
  }, function (error) {
    // Do something with request error
    console.log(error)
    return Promise.reject(error);
  });


// GET request
export function useAxiosGet(url) {
    const response = useAxios(url, { method: 'GET' }, instance)
    return response
}

// POST request
// export function useAxiosPost(url, configOptions) {
//     const { response , data, isFinished } = useAxios(url, { method: 'POST',  }, instance)
//     return { response, data , isFinished}
// }