import { timestamp } from "@vueuse/core";
import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { LocalStorage } from "quasar";
import { setWithExpiry, getWithExpiry } from "src/utils/local_storage";
import { useQuasar } from "quasar";

const $q = useQuasar();

export const useUserStore = defineStore("user", {
  state: () => ({ user: null }),
  getters: {},
  actions: {
    loginUser(loginData, _callback, _errorcallback) {
      const form = new FormData();
      form.append("username", loginData.email);
      form.append("password", loginData.password);
      api
        .post("/auth/login", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          LocalStorage.set("access_token", response.data["access_token"]);
          setWithExpiry("refresh_token", response.data["refresh_token"], 120);
          api
            .get("/users/me")
            .then((response) => {
              this.user = response.data;
              _callback();
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => _errorcallback());
    },

    logoutUser() {
      LocalStorage.remove("access_token");
      LocalStorage.remove("refresh_token");
      this.user = null;
      return "logged out user";
    },
    async refreshAccessToken(refreshToken) {
      api
        .post("/auth/refresh", { refresh_token: refreshToken })
        .then((response) => {
          this.accessToken = response.data["access_token"];
          this.refreshToken = response.data["refresh_token"];
          console.log(`Refresh klaar en tokens opgeslagen ${timestamp}`);
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
  },
});
