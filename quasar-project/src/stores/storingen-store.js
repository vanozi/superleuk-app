import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useStoringenStore = defineStore( {
  id: "storingen",
  state: () => ({
    storingen: [],
    loading: false,
    error: null,
    storing : null
  }),
  getters: {

  },

  actions: {
    async fetchAllStoringen() {
      this.loading = true;
      try {
        this.storingen = await api
          .get("/machine_maintenance_issues/")
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async fetchStoring(id) {
      this.storing = null
      this.loading = true
      try {
        this.storing = await api.get(`/machine_maintenance_issues/${id}`)
        .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async updateStoring(updatedStoring) {
      this.storing = null
      this.loading = true
      try {
        this.storing = await api.put(`/machine_maintenance_issues/`, updatedStoring)
        .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
        this.fetchAllStoringen();
      }
    }
  },
});
