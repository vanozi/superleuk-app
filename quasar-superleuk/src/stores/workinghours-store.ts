import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { CallbackNOParam, IWorkingHours } from 'src/types/typescipt-models';
import { computed, ref } from 'vue';

export const useWorkingHoursStore = defineStore('workinghours-store', () => {
  const allWorkingHours = ref();
  const workingHoursBetweenDates = ref();
  const workingHoursEventsLoggedInUser = ref();

  const workingHoursEventsLoggedInUserComputed = computed(() => {
    return workingHoursEventsLoggedInUser.value;
  });

  async function fetchWorkingHoursBetweenDates(from: string, to: string) {
    api
      .get('/working_hours/between_dates/', {
        params: { from_date: from, to_date: to },
      })
      .then((response) => {
        response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function fetchWorkingHoursLoggedInUser() {
    api
      .get('/working_hours/all')
      .then((response) => {
        allWorkingHours.value = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function fetchWorkingHoursAsCalendarEventsLoggedInUser() {
    api
      .get('/working_hours/calendar-events')
      .then((response) => {
        workingHoursEventsLoggedInUser.value = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function addOrUpdateWorkingHours(
    payload: IWorkingHours,
    _callback: CallbackNOParam
  ) {
    api
      .put(`/working_hours/`, payload)
      .then(() => {
        Notify.create({
          type: 'positive',
          message: 'Uren succesvol aangepast',
          icon: 'done',
        });
        _callback();
      })
      .catch((error) => {
        if (error.response) {
          Notify.create({
            type: 'negative',
            message: error.response.data.detail,
            icon: 'error',
          });
        }
      });
  }

  async function deleteWorkingHours(id:number, _callback:CallbackNOParam){
    api
      .delete(`/working_hours/${id}`)
      .then(() => {
        Notify.create({
          type: 'positive',
          message: 'Uren succesvol verwijderd',
          icon: 'done',
        });
        _callback();
      })
      .catch((error) => {
        if (error.response) {
          Notify.create({
            type: 'negative',
            message: error.response.data.detail,
            icon: 'error',
          });
        }
      });
  }
  return {
    fetchWorkingHoursBetweenDates,
    fetchWorkingHoursLoggedInUser,
    fetchWorkingHoursAsCalendarEventsLoggedInUser,
    workingHoursBetweenDates,
    allWorkingHours,
    workingHoursEventsLoggedInUser,
    workingHoursEventsLoggedInUserComputed,
    addOrUpdateWorkingHours,
    deleteWorkingHours
  };
});
