<script setup lang="ts">
import UrenRegistratieCalendarComponent from 'components/uren/HoursCalendar.vue';
import { computed, provide, ref } from 'vue';
const showHourEditDialog = ref(false);
const options = ref();
const computedOptions = computed(() => {
  if (options.value == undefined) {
    return [];
  } else {
    return options.value;
  }
});
provide('showHourEditDialog', showHourEditDialog);
provide('options', computedOptions);
</script>

<template>
  <UrenRegistratieCalendarComponent />
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
