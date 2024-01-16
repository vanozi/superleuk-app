import {
  LoginFormInterface,
  CallbackNOParam,
} from 'src/types/typescipt-models';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { LocalStorage } from 'quasar';
import { Notify } from 'quasar';
import { computed, ComputedRef, Ref, ref } from 'vue';
import { AxiosError, AxiosResponse } from 'axios';
import { IUser } from 'src/types/modules/user/interfaces';

export const useAccountStore = defineStore('account-store', () => {
  const loggedInUser: Ref<IUser | undefined> = ref();

  const isLoggedIn = computed(() => {
    return loggedInUser.value !== undefined;
  });

  const loggedInUserRoles: ComputedRef<string[]> = computed(() => {
    if (loggedInUser.value) {
      return loggedInUser.value.roles.map((role: { name: string }) => role.name);
    }
    return [];
  });

  /**
   * Checks if the logged in user has a specific role.
   *
   * @param roleName - The name of the role to check.
   * @returns True if the logged in user has the specified role, false otherwise.
   */
  const hasUserRole = (roleName: string): boolean => {
    return loggedInUserRoles.value.includes(roleName);
  };

  /**
   * Logs out the user.
   *
   * @param _callback - Optional callback function to be executed after logout.
   */
  async function logoutUser(_callback?: CallbackNOParam): Promise<void> {
    try {
      // Send a POST request to the '/auth/logout' endpoint
      await api.post('/auth/logout');

      // Remove the access token from the local storage
      LocalStorage.remove('access_token');

      // Set the logged in user to undefined
      loggedInUser.value = undefined;

      // Display a success notification
      Notify.create({
        type: 'positive',
        message: 'Je bent uitgelogd',
        icon: 'done',
      });

      // Call the callback function if provided
      if (_callback) {
        _callback();
      }
    } catch (error: AxiosError | any) {
      // Handle any errors that occur during logout
      if (error.response) {
        // Display an error notification with the error message
        Notify.create({
          type: 'negative',
          message: error.response.data.detail,
          icon: 'error',
        });
      }
    }
  }

  async function loginUser(
    payload: LoginFormInterface,
    _callback?: CallbackNOParam,
    _errorcallback?: CallbackNOParam
  ): Promise<void> {
    const form: FormData = new FormData();
    form.append('username', payload.email);
    form.append('password', payload.password);
    await api
      .post('/auth/login', form, {
        headers: {
          'Content-Type': 'multipart/custom-quasar-data',
        },
      })
      .then((response: AxiosResponse): void => {
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
      .catch((error): void => {
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

  async function fetchLoggedInUserData(): Promise<void> {
    api
      .get('/users/me')
      .then((response: AxiosResponse<any>): void => {
        loggedInUser.value = response.data;
      })
      .catch((error) => console.log(error));
  }

  async function refreshTokens(_callback?: any, _errorcallback?: any): Promise<void> {
    api
      .get('/auth/refresh', {
        withCredentials: true,
      })
      .then((response: AxiosResponse<any>): void => {
        LocalStorage.set('access_token', response.data['access_token']);
        if (typeof _callback !== 'undefined') {
          _callback();
        }
      })
      .catch((): void => {
        if (typeof _errorcallback !== 'undefined') {
          _errorcallback();
        }
      });
  }

  async function forgotPassword(email: string, _callback?: any): Promise<void> {
    api
      .get(`/auth/forgot_password/${email}`)
      .then((): void => {
        Notify.create({
          type: 'positive',
          message: 'Er is een e-mail verstuurd',
          icon: 'done',
        });
        if (typeof _callback !== 'undefined') {
          _callback();
        }
      })
      .catch((error): void => {
        if (error.response) {
          Notify.create({
            type: 'negative',
            message: error.response.data.detail,
            icon: 'error',
          });
        }
      });
  }

  async function resetPassword(password: string, token: any, _callback?: any): Promise<void> {
    api
      .post('/auth/reset_password', { token: token, password: password })
      .then((): void => {
        Notify.create({
          type: 'positive',
          message: 'Wachtwoord succesvol gewijzigd',
          icon: 'done',
        });
        if (typeof _callback !== 'undefined') {
          _callback();
        }
      })
      .catch((error): void => {
        if (error.response) {
          Notify.create({
            type: 'negative',
            message: error.response.data.detail,
            icon: 'error',
          });
        }
      });
  }

  return {
    loggedInUserRoles,
    loggedInUser,
    isLoggedIn,
    hasUserRole,
    loginUser,
    logoutUser,
    fetchLoggedInUserData,
    refreshTokens,
    forgotPassword,
    resetPassword,
  };
});
