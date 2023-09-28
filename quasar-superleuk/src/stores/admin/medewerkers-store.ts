import {defineStore} from "pinia";
import {api} from "boot/axios";
import {Notify} from "quasar";

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

export const useMedewerkersStore = defineStore('medewerkers-store', {
    state: () => ({
        medewerkers: [] as IMedewerker[],
        roles: [] as IRole[],
    }),
    getters: {
        getUserById: (state) => {
            return (userId: number): IMedewerker | undefined => state.medewerkers.find((user) => user.id === userId)
        },
    },
    actions: {
        async fetchMedewerkers(): Promise<void> {
            api.request({url: '/users/', method: 'get'}).then((response) => {
                    this.medewerkers = response.data;
                    console.log(this.medewerkers)
                }
            ).catch((error) => {
                console.log(error);
            });
        },
        async updateMedewerker(medewerker: IMedewerker) {
            await api.request({method: 'put', url: '/users/' + medewerker.id, data: medewerker}).then((response) => {
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
            await api.request({method: 'put', url: '/users/address/' + user_id, data: address}).then((response) => {
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
            await api.request({url: '/roles/', method: 'get'}).then((response) => {
                    this.roles = response.data;
                }
            ).catch((error) => {
                console.log(error);
            })
        },
        async addUserRole(user_id: number, role_id: number) {
            await api.request({method: 'post', url: '/users/add-role/', data: {user_id: user_id, role_id: role_id}}).then((response) => {
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
            await api.request({method: 'delete', url: '/users/delete-role/', data: {user_id: user_id, role_id: role_id}}).then((response) => {
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

