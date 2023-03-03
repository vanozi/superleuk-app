import { LoginFormInterface } from 'src/models/typescipt-models';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Loading, Notify } from 'quasar';
import {
  IMachineState,
  IMachine,
  IFilterMachine,
} from 'src/models/typescipt-models';
import { ref } from 'vue';

export const useMachinesStore = defineStore('machines-store', {
  state: (): IMachineState => ({
    machines: [],
    filteredMachines: [],
    machineFilters: {
      brands: [],
      categories: [],
      groups: [],
      models: [],
    } as IFilterMachine,
    machine: {} as IMachine,
    loading: false,
  }),
  actions: {
    async fetchMachines() {
      this.loading = true;
      Loading.show({
        message: 'Machine data wordt opgehaald...',
        boxClass: 'bg-grey-2 text-grey-9',
      });
      this.machines = await api
        .get('/machines/')
        .then((response) => response.data)
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data.detail);
            Notify.create({
              type: 'negative',
              message: error.response.data.detail,
              icon: 'error',
            }); // => the response payload
          }
        });
      this.loading = false;
      Loading.hide();
    },
    updateMachineFilters(filter: any) {
      this.machineFilters = filter;
    },
  },
  getters: {
    getBrands: (state) => {
      return [...new Set(state.machines.map((el: IMachine) => el.brand_name))];
    },
    getCategories: (state) => {
      return [...new Set(state.machines.map((el: IMachine) => el.category))];
    },
    getGroups: (state) => {
      return [...new Set(state.machines.map((el: IMachine) => el.group))];
    },
    getModels: (state) => {
      return [...new Set(state.machines.map((el: IMachine) => el.type_name))];
    },
    // getFilteredMachines: (state) => {
    //   return (filters: IFilterMachine) => filters;

    // return state.machines.filter((el: IMachine) => {
    //   console.log(state.machineFilters.brands);
    //   state.machineFilters.brands.indexOf(el.brand_name) > -1;
    // if (state.machineFilters.brands != null) {
    //   if (state.machineFilters.brands.indexOf(el.brand_name) > -1) {
    //     return true;
    //   }
    // }
    // if (state.machineFilters.groups != null) {
    //   if (state.machineFilters.groups.indexOf(el.group) > -1) {
    //     return true;
    //   }
    // }
    // if (state.machineFilters.categories != null) {
    //   if (state.machineFilters.categories.indexOf(el.category) > -1) {
    //     return true;
    //   }
    // }
    // if (state.machineFilters.models != null) {
    //   if (state.machineFilters.models.indexOf(el.type_name) > -1) {
    //     return true;
    //   }
    // }
    // return false;
    // });
    // },
    // getUserById: (state) => {
    //   return (userId: number) => userId;
    // },
  },
});

// users = users.filter(obj => obj.name == filter.name && obj.address == filter.address)
