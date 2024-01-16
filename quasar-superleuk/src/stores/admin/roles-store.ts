import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { Notify } from 'quasar';


export interface IRole {
  id: number,
  name: string;
  description: string;
}


export const useAdminRoleStore = defineStore('admin-roles-store', {
  state: () => ({
    roles: [] as IRole[],
  }),
  getters: {
  },
  actions: {
    async fetchRoles(): Promise<void> {
      api.request({ url: '/admin/roles/', method: 'get' }).then((response) => {
        console.log(" henk");
        this.roles = response.data;
      }).catch((error) => {
        Notify.create({
          type: 'negative',
          message: error.response.data.detail,
          icon: 'error',
        });
      });
    },
  }

});

