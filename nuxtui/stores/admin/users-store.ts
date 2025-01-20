
import { defineStore } from 'pinia'
import type { CallbackNOParam, CallbackOneParam } from '~/types/generic'
import { AdminUsersService } from '~/utils/client/services.gen'
import type {app__models__pydantic_models__users__UserResponse } from '~/utils/client/types.gen'


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
