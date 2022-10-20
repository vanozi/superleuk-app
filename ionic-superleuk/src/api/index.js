import axios from 'axios';
import store from '../store'

const baseURL = process.env.VUE_APP_BASE_URL_API;

const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(function (config) {
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

// api.interceptors.response.use((response) => response,
//   (pError) => {
//     if (pError.response.status === 401) {
//       console.log(pError.response.status);
//       window.location = '/logout';
//     }

//     return Promise.reject(pError);
//   });



export default api;
