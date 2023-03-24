import {
  LoginFormInterface,
  CallbackNOParam,
} from 'src/models/typescipt-models';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { LocalStorage } from 'quasar';
import { Notify } from 'quasar';
import { computed, ref } from 'vue';
import { AxiosResponse } from 'axios';

export const useAccountStore = defineStore('account-store', () => {
  const loggedInUser = ref(null);

  const isLoggedIn = computed(() => {
    return loggedInUser.value !== null;
  });

  async function logoutUser(_callback?: CallbackNOParam) {
    api
      .post('/auth/logout')
      .then((response) => {
        LocalStorage.remove('access_token');
        loggedInUser.value = null;
        Notify.create({
          type: 'positive',
          message: 'Je bent uitgelogd',
          icon: 'done',
        });
        if (_callback) {
          _callback();
        }
      })
      .catch((error) => {
        if (error.response) {
          Notify.create({
            type: 'negative',
            message: error.response.data.detail,
            icon: 'error',
          });
        }
      });
  }
  async function loginUser(
    payload: LoginFormInterface,
    _callback?: CallbackNOParam,
    _errorcallback?: CallbackNOParam
  ) {
    const form = new FormData();
    form.append('username', payload.email);
    form.append('password', payload.password);
    await api
      .post('/auth/new-login', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response: AxiosResponse) => {
        LocalStorage.set('access_token', response.data['access_token']);
        Notify.create({
          type: 'positive',
          message: 'Je bent ingelogd',
          icon: 'done',
        });
        fetchLoggedInUserData();
        if (_callback) {
          _callback();
        }
      })
      .catch((error) => {
        if (error.response) {
          Notify.create({
            type: 'negative',
            message: error.response.data.detail,
            icon: 'error',
          });
          if (_errorcallback) {
            _errorcallback();
          }
        }
      });
  }
  async function fetchLoggedInUserData() {
    api
      .get('/users/me')
      .then((response) => {
        loggedInUser.value = response.data;
      })
      .catch((error) => console.log(error));
  }
  async function refreshTokens(_callback?: any, _errorcallback?: any) {
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
  }
  return {
    loggedInUser,
    isLoggedIn,
    loginUser,
    logoutUser,
    fetchLoggedInUserData,
    refreshTokens,
  };
});
