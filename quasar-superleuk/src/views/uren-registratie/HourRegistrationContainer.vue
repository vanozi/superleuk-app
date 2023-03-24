<script setup lang="ts">
import { provide, ref, onBeforeMount } from 'vue';
import HourRegistrationCalendar from 'src/components/uren-registratie/HourRegistrationCalendar.vue';
import { useWorkingHoursStore } from 'src/stores/workinghours-store';

// init stores
const workingHoursStore = useWorkingHoursStore();
onBeforeMount(async () => {
  await workingHoursStore.fetchWorkingHoursAsCalendarEventsLoggedInUser();
});
</script>
<template>
  <q-page>
    <HourRegistrationCalendar />
  </q-page>
</template>
