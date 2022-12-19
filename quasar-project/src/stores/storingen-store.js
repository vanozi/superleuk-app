import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify } from 'quasar'

export const useStoringenStore = defineStore( {
  id: "storingen",
  state: () => ({
    storingen: [],
    loading: false,
    error: null,
    storing : null
  }),
  getters: {
    getNotClosedStoringen(state) {
      return state.storingen.filter((storing) => storing.status !== 'Gesloten');
    }
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
    async postNewStoring(storing, _callback, _errorcallback) {
      this.loading = true;
      try {
        await api.post(`/machine_maintenance_issues/`, storing)
        .then((response) => {_callback()})
      } catch (error) {
        this.error = error;
        _errorcallback();
      } finally {
        this.loading = false
        this.fetchAllStoringen();
      }
    },
    async updateStoring(updatedStoring, _callback, _errorcallback) {
      this.loading = true
      try {
        await api.put(`/machine_maintenance_issues/`, updatedStoring)
        .then((response) => {this.storing = response.data; _callback()})

      } catch (error) {
        this.error = error;
        _errorcallback();
      } finally {
        this.loading = false
        this.fetchAllStoringen();
      }
    }
  },
});

