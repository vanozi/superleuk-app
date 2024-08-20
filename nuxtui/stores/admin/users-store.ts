
import { defineStore } from 'pinia'
import type { CallbackNOParam, CallbackOneParam } from '~/types/generic'
import { AdminUsersService, AuthService, UsersService } from '~/utils/client/services.gen'
import type { Body_auth_login, RegisterUserRequest, ResetPassword, app__models__pydantic_models__auth__UserResponse, app__models__pydantic_models__users__UserResponse } from '~/utils/client/types.gen'

interface Data {
  formData: Body_auth_login;
}


export const useAdminUsersStore = defineStore('admin-users-store', {
  state: () => ({
    users: [] as app__models__pydantic_models__users__UserResponse[],
  }),
  getters: {

  },
  actions: {
    async getAllUsers(_callback?: CallbackNOParam,
      _errorcallback?: CallbackOneParam<string>) {
      await AdminUsersService.adminUsersGetAllUsers().then((response) => {
        this.users = response
        if (_callback) {
          _callback()
        }
      }).catch(error => {
        if (_errorcallback) {
          _errorcallback(error.message)
        }
      })
    },
  }
})
