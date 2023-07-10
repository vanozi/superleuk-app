import {
  LoginFormInterface,
  CallbackNOParam,
} from 'src/types/typescipt-models';
import {defineStore} from 'pinia';
import {api} from 'src/boot/axios';
import {LocalStorage} from 'quasar';
import {Notify} from 'quasar';
import {computed, ComputedRef, Ref, ref} from 'vue';
import {AxiosResponse} from 'axios';
import {IUser} from 'src/types/modules/user/interfaces';

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

  const hasUserRole = (roleName: string): boolean => {
    return loggedInUserRoles.value.includes(roleName);
  };

  async function logoutUser(_callback?: CallbackNOParam): Promise<void> {
    api
      .post('/auth/logout')
      .then((): void => {
        LocalStorage.remove('access_token');
        loggedInUser.value = undefined;
        Notify.create({
          type: 'positive',
          message: 'Je bent uitgelogd',
          icon: 'done',
        });
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
        }
      });
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
      .post('/auth/new-login', form, {
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
      .get('/auth/new-refresh', {
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
      .post(`/auth/reset_password`, {token: token, password: password})
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
