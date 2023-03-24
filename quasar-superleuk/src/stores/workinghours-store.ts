import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
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
        workingHoursBetweenDates.value = response.data;
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

  return {
    fetchWorkingHoursBetweenDates,
    fetchWorkingHoursLoggedInUser,
    fetchWorkingHoursAsCalendarEventsLoggedInUser,
    workingHoursBetweenDates,
    allWorkingHours,
    workingHoursEventsLoggedInUser,
    workingHoursEventsLoggedInUserComputed,
  };
});
