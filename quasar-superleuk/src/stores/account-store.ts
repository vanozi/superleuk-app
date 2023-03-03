import { LoginFormInterface } from 'src/models/typescipt-models';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { LocalStorage } from 'quasar';
import { Notify } from 'quasar';

export const useAccountStore = defineStore('account-store', {
  state: () => ({
    loggedInUser: {},
  }),
  actions: {
    // api call to get the access/refresh token for the user
    async logInUser(
      payload: LoginFormInterface,
      _callback?: any,
      _errorcallback?: any
    ) {
      const form = new FormData();
      form.append('username', payload.email);
      form.append('password', payload.password);
      await api
        .post('/auth/login', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          LocalStorage.set('access_token', response.data['access_token']);
          Notify.create({
            type: 'positive',
            message: 'Je bent ingelogd',
            icon: 'done',
          });
        }, _callback())
        .catch((error) => {
          if (error.response) {
            Notify.create({
              type: 'negative',
              message: error.response.data.detail,
              icon: 'error',
            });
          }
          _errorcallback();
        });
    },
    // get information for the logged in user
    async fetchLoggedInUserData() {
      api
        .get('/users/me')
        .then((response) => {
          this.loggedInUser = response.data;
        })
        .catch((error) => console.log(error));
    },
    // refresh the access token
    async refreshTokens(_callback?: any, _errorcallback?: any) {
      api
        .get('/auth/refresh', {
          withCredentials: true,
        })
        .then((response) => {
          LocalStorage.set('access_token', response.data['access_token']);
          if (typeof _callback !== 'undefined') {
            _callback();
          }
        })
        .catch((error) => {
          if (typeof _errorcallback !== 'undefined') {
            _errorcallback();
          }
        });
    },
  },
});
