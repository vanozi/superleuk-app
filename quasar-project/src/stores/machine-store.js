import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useMachineStore = defineStore({
  id: 'machines',
  state: () => ({
    machines: [],
    machine : null,
    loading: false,
    error: null
  }),
  getters: {
    getMachine :  (state) => {return state.machine}
  },
  actions: {
    async fetchMachines() {
      this.loading = true
      try {
        this.machines = await api.get('/machines/')
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchMachine(id) {
      this.post = null
      this.loading = true
      try {
        this.machine = await api.get(`/machines/${id}`)
        .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  },
});
