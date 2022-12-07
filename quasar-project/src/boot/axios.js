import { boot } from "quasar/wrappers";
import axios from "axios";
import { setWithExpiry, getWithExpiry } from "src/utils/local_storage";
import { LocalStorage } from "quasar";
import { router } from 'src/router'
import { useUserStore } from "src/stores/user-store";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: "https://superleuk.gebroedersvroege.nl/api",
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    config.headers['Access-Control-Allow-Origin'] = "*";
    // Do something before request is sent
    if (config._retry == true) {
      return config;
    }
    if (LocalStorage.getItem("access_token") != null) {
      config.headers.Authorization = `Bearer ${LocalStorage.getItem(
        "access_token"
      )}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (res) => {
    return res;
  },
  // if error code is 401 then try to refresh the token
  // if error code is 403 because refresh token is expired, then logout
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/login" && err.response) {
      // Eerste keer dat je tegen een 401 unauthorized aanloopt, betekend dat de geldigheid van de access token is verlopen
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        // Probeer het refresh token uit de storage te halen
        // als die verlopen is dan uitloggen en naar de login pagina door routen
        const refresh_token = getWithExpiry("refresh_token");
        if(refresh_token === null ) {
          const userStore = useUserStore();
          userStore.logoutUser();
          router.push("/auth/login");
          return err
        }
        // als nog niet verlopen dan een nieuw access en refresh token ophalen
        api
          .post("/auth/refresh", {
            refresh_token: refresh_token,
          })
          // geldige response dus de teruggekregen tokens in de localStorage opslaan en het oorspronkelijke request weer uitvoeren
          .then((response) => {
            if (response?.data) {
              originalConfig.headers = {
                ...originalConfig.headers,
                Authorization: `Bearer ${response?.data["access_token"]}`,
              };
              LocalStorage.set("access_token", response.data["access_token"]);
              setWithExpiry(
                "refresh_token",
                response.data["refresh_token"],
                120
              );
            }
            return api(originalConfig);
          })
          // Elke error die hier optreeds is uitloggen en doorverwijzen naar de login pagina
          .catch((error) => {
            console.log(error)
          });
      }
    }
    return Promise.reject(err);
  }
);

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
