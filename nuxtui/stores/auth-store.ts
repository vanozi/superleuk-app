
import { defineStore } from 'pinia'
import type { CallbackNOParam, CallbackOneParam } from '~/types/generic'
import { AuthService, UsersService } from '~/utils/client/services.gen'
import type { Body_auth_login, RegisterUserRequest, ResetPassword, app__models__pydantic_models__auth__UserResponse } from '~/utils/client/types.gen'

interface Data {
  formData: Body_auth_login;
}


export const useAuthStore = defineStore('auth-store', {
  state: () => ({
    loggedIn: false,
    loggedInUser: {} as app__models__pydantic_models__auth__UserResponse

  }),
  getters: {
    loggedInUserRoles: (state) => state.loggedInUser.roles,
    loggedInUserHasRole: (state) => (rolName: string): boolean => {
      if (!state.loggedInUser.roles) {
        return false
      }
      return state.loggedInUser.roles.some(role => role.name === rolName)
    }
  },
  actions: {
    async register(data: RegisterUserRequest, _callback?: CallbackOneParam<string>,
      _errorcallback?: CallbackOneParam<string>) {
      await AuthService.authRegister({requestBody : data}).then((response) => {
        if (_callback) {
          _callback(response.data as string)
        }
      }).catch(error => {
        if (_errorcallback) {
          _errorcallback(error.message)
        }
      })
    },
    async login(data: Data, _callback?: CallbackNOParam,
      _errorcallback?: CallbackOneParam<string>) {
      await AuthService.authLogin(data).then(async(response) => {
        localStorage.setItem('access_token', response.access_token)
        await this.getLoggedInUser()
        this.loggedIn = true
        if (_callback) {
          _callback()
        }
      }).catch(error => {
        if (_errorcallback) {
          _errorcallback(error.message)
        }
      })
    },
    async getLoggedInUser() {
      await UsersService.usersGetMe().then((response) => {
        this.loggedInUser = response
      }).catch(error => {

        localStorage.removeItem('access_token')
      })
    },
    async logout(_callback?: CallbackNOParam,
      _errorcallback?: CallbackOneParam<string>) {
      await AuthService.authLogout().then(() => {
        localStorage.removeItem('access_token')
        this.loggedIn = false
        this.loggedInUser = {} as app__models__pydantic_models__auth__UserResponse
        if (_callback) {
          _callback()
        }
      }).catch(error => {
        if (_errorcallback) {
          _errorcallback(error.message)
        }
      })
    },

    async forgotPassword(email: string, _callback?: CallbackNOParam,_errorcallback?: CallbackOneParam<string>) {
      await AuthService.authForgotPassword({email}).then(() => {
        if (_callback) {
          _callback()
        }
      }).catch(error => {
        if (_errorcallback) {
          _errorcallback(error.message)
        }
      })
    },
    async resetPassword(data : ResetPassword, _callback?: CallbackNOParam,_errorcallback?: CallbackOneParam<string>) {
      await AuthService.authResetPassword({requestBody : data}).then(() => {
        if (_callback) {
          _callback()
        }
      }).catch(error => {
        if (_errorcallback) {
          _errorcallback(error.message)
        }
      })
    },
    persist: true,
  },
})
