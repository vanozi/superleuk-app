<script setup lang="ts">
import UrenRegistratieCalendarComponent from 'src/components/uren-registratie/UrenRegistratieCalendarComponent.vue';
import { onBeforeMount, provide, ref } from 'vue';
import { useWorkingHoursStore } from 'src/stores/workinghours-store';
import InvoerenDialogComponent from 'src/components/uren-registratie/InvoerenDialogComponent.vue';
const workingHoursStore = useWorkingHoursStore();
const showHourEditDialog = ref(false);
provide('showHourEditDialog', showHourEditDialog);

onBeforeMount(() => {
  workingHoursStore.fetchWorkingHoursLoggedInUser();
});
</script>

<template>
  <main>
    <div class="q-mx-sm">
      <UrenRegistratieCalendarComponent
        :workingHoursUser="workingHoursStore.allWorkingHours"
        @addHours="showHourEditDialog = true"
      />
    </div>
    <InvoerenDialogComponent />
  </main>
</template>

<style>
.fc .fc-toolbar-title {
  font-size: 18px;
  font-weight: 400;
}
.fc .fc-list-event-graphic {
  display: none;
}

.fc .fc-customprev-button,
.fc .fc-customnext-button,
.fc .fc-listWeek-button,
.fc .fc-dayGridMonth-button {
  background-color: white;
  color: black;
}
.fc .fc-submitHours-button {
  background-color: #4caf50;
  color: white;
  border-color: #4caf50;
}
</style>
