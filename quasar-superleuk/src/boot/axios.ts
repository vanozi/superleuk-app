import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { LocalStorage } from 'quasar';
import { useAccountStore } from 'stores/account-store';
import { router } from 'src/router';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: 'http://localhost:8004/api',
  withCredentials: true,
});

// Request interceptor for adding the Authorization header when stored in local storage
api.interceptors.request.use(
  function (config) {
    // Check if access token is saved in the local storage, if so than add it as a header to the request
    if (LocalStorage.getItem('access_token') != null) {
      config.headers.Authorization = `Bearer ${LocalStorage.getItem(
        'access_token'
      )}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Request interceptor
api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    // Save the original request
    const originalRequest = err.config;
    // if access token has expired send a request to refresh the tokens
    if (
      err.response.status === 401 &&
      err.response.data.detail === 'Could not validate credentials' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const accounStore = useAccountStore();
      await accounStore.refreshTokens(
        // When the tokens are successfully refreshed repeat the original request
        function () {
          return api(originalRequest);
        },
        function () {
          // if the token refresh returns an error then remove the access token from the local storage
          // and route back to the login page
          LocalStorage.remove('acces_token');
          router.push('/auth/login');
        }
      );
    } else {
      return Promise.reject(err);
    }
  }
);
// write an axios interceptor to refresh the tokens when they expire
// https://stackoverflow.com/questions/51563821/axios-interceptors-retry-original-request-and-access-original-promise

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
