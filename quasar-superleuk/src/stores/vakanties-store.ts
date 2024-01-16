import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { Ref, computed, ref } from 'vue';
import { AxiosResponse } from 'axios';
import { IResource, IVakantie } from "components/models";


export const useVakantiesStore = defineStore('vakanties-store', () => {
  const resources: Ref<IResource[]> = ref([]);
  const vakanties: Ref<IVakantie[]> = ref([]);
  const vakantiesLoggedInUser: Ref<IVakantie[]> = ref([]);


  // api calls
  async function fetchResources() {
    try {
      const response = await api.get('/vakanties/resources/');
      resources.value = response.data;
      return response.data;
    } catch (error: any) {
      if (error.response) {
        Notify.create({
          type: 'negative',
          message: error.response.data.detail,
          icon: 'error',
        });
      }
      // You should handle the error and possibly return an appropriate value or throw an error here.
      // Example: throw new Error("Failed to fetch resources");
    }
  }
  async function fetchVakanties() {
    try {
      const response = await api.get('/vakanties/all/');
      vakanties.value = response.data;
      return response.data;
    } catch (error: any) {
      if (error.response) {
        Notify.create({
          type: 'negative',
          message: error.response.data.detail,
          icon: 'error',
        });
      }
      // You should handle the error and possibly return an appropriate value or throw an error here.
      // Example: throw new Error("Failed to fetch resources");
    }
  }
  async function fetchVakantiesForLoggedInUser() {
    try {
      const response = await api.get('/vakanties/all_for_me/');
      vakantiesLoggedInUser.value = response.data;
      return response.data;
    } catch (error: any) {
      if (error.response) {
        Notify.create({
          type: 'negative',
          message: error.response.data.detail,
          icon: 'error',
        });
      }
      // You should handle the error and possibly return an appropriate value or throw an error here.
      // Example: throw new Error("Failed to fetch resources");
    }
  }
  async function addVakantie(start_date: string, end_date: string) {
    try {
      const response = await api.post('/vakanties/', { start_date, end_date });
      {
        Notify.create({
          type: 'positive',
          message: 'Vakantie toegevoegd',
          icon: 'done',
        });
      }
      return response.data;
    } catch (error: any) {
      if (error.response) {
        Notify.create({
          type: 'negative',
          message: error.response.data.detail,
          icon: 'error',
        });
      }
    }

  }
  async function deleteVakantie(id: number) {
    try {
      const response = await api.delete(`/vakanties/${id}/`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        Notify.create({
          type: 'negative',
          message: error.response.data.detail,
          icon: 'error',
        });
      }
    }

  }
  return {
    resources,
    vakanties,
    vakantiesLoggedInUser,
    fetchResources,
    fetchVakanties,
    fetchVakantiesForLoggedInUser,
    addVakantie,
    deleteVakantie
  };
});
