import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { Notify } from 'quasar';

export interface IAddress {
  id: number,
  street: string;
  number: string;
  postal_code: string;
  city: string;
  country: string;
}

export interface IRole {
  id: number,
  name: string;
  description: string;
}

export interface IMedewerker {
  id: number,
  first_name: string;
  last_name: string;
  email: string;
  telephone_number: string;
  date_of_birth: string;
  address: IAddress[];
  roles: IRole[];
}

export const useMedewerkersStore = defineStore('admin-medewerkers-store', {
  state: () => ({
    medewerkers: [] as IMedewerker[],
    roles: [] as IRole[],
    medewerker: {} as IMedewerker | undefined,
  }),
  getters: {
    getUserById: (state) => (userId: number): IMedewerker | undefined => {
      const medewerker = state.medewerkers.find((user) => user.id === userId);
      state.medewerker = medewerker;
      return medewerker;
    },

    hasUserRole: (state) => (roleName: string): boolean => {
      if (state.medewerker !== undefined) {
        return state.medewerker?.roles.map((role: { name: string }) => role.name).includes(roleName);
      }
      return false

    }
  },
  actions: {
    async fetchMedewerkers(): Promise<void> {
      api.request({ url: '/admin/users/', method: 'get' }).then((response) => {
        this.medewerkers = response.data;
        // Filter medewerkers who have a role with the name "admin"
        this.medewerkers = this.medewerkers.filter((user) => {
          // Replace 'roles' with the actual property name that represents user roles
          return user.roles.some((role) => role.name !== 'admin'); // Adjust this condition as needed
        });
      }
      ).catch((error) => {
        console.log(error);
      });
    },
    async updateMedewerker(medewerker: IMedewerker) {
      await api.request({ method: 'put', url: '/users/' + medewerker.id, data: medewerker }).then((response) => {
        // replace the medewerker in state medewerkers with the updated one
        const index = this.medewerkers.findIndex((m) => m.id === medewerker.id);
        this.medewerkers[index] = response.data;
        // find the
        Notify.create({
          type: 'positive',
          message: 'Medewerker is aangepast',
          icon: 'check',
        });
      }).catch((error) => {
        Notify.create({
          type: 'negative',
          message: error.response.data.detail,
          icon: 'error',
        });
      });
    },
    async updateAddress(address: IAddress, user_id: number) {
      await api.request({ method: 'put', url: '/admin/address/' + user_id, data: address }).then((response) => {
        // replace the medewerker in state medewerkers with the updated one
        const index = this.medewerkers.findIndex((m) => m.id === user_id);
        this.medewerkers[index] = response.data;
        // find the
        Notify.create({
          type: 'positive',
          message: 'Adres is aangepast',
          icon: 'check',
        });
      }).catch((error) => {
        Notify.create({
          type: 'negative',
          message: error.response.data.detail,
          icon: 'error',
        });
      });
    },
    async fetchAllRoles(): Promise<void> {
      await api.request({ url: '/roles/', method: 'get' }).then((response) => {
        this.roles = response.data;
      }
      ).catch((error) => {
        console.log(error);
      })
    },
    async addUserRole(user_id: number, role_id: number) {
      await api.post('/admin/users/add_role_to_user/', { user_id: user_id, role_id: role_id }).then((response) => {
        // replace the medewerker in state medewerkers with the updated one
        const index = this.medewerkers.findIndex((m) => m.id === user_id);
        this.medewerkers[index] = response.data;
        // find the
        Notify.create({
          type: 'positive',
          message: 'Rol is toegevoegd',
          icon: 'check',
        });

      }).catch((error) => {
        Notify.create({
          type: 'negative',
          message: error.response.data.detail,
          icon: 'error',
        });
      });
    },
    async deleteUserRole(user_id: number, role_id: number) {
      await api.request({ method: 'delete', url: '/admin/users/remove_role_from_user/', data: { user_id: user_id, role_id: role_id } }).then((response) => {
        // replace the medewerker in state medewerkers with the updated one
        const index = this.medewerkers.findIndex((m) => m.id === user_id);
        this.medewerkers[index] = response.data;
        // find the
        Notify.create({
          type: 'positive',
          message: 'Rol is verwijderd',
          icon: 'check',
        });

      }).catch((error) => {
        Notify.create({
          type: 'negative',
          message: error.response.data.detail,
          icon: 'error',
        });
      });

    }
  }

});

