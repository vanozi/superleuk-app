import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useMachineStore } from "./machine-store";

export const useTankGegevens = defineStore( {
  id: "tankgegevens",
  state: () => ({
    tankGegevens: null,
    loading: false,
    error: null,
  }),
  getters: {
    getMachineTankdata: (state) => {
      const machineStore = useMachineStore();
      return (machineStore.machine ? state.tankGegevens.filter((tankbeurt) => tankbeurt.vehicle === machineStore.machine.work_name) : null);
    },
  },

  actions: {
    async fetchTankgegevens() {
      this.loading = true;
      try {
        this.tankGegevens = await api
          .get("/tank_transactions/")
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
