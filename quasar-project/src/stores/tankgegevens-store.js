import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useTankGegevens = defineStore("tankgegevens", {
  state: () => ({
    tankGegevens: null,
    loading: false,
    error: null
  }),
  getters: {},
  actions: {
    async fetchTankgegevens() {
      this.loading = true
      try {
        this.tankGegevens = await api.get('/tank_transactions/')
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
  },
});
