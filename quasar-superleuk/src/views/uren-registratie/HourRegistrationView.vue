<script setup>
import { ref, provide } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { useWorkingHoursStore } from 'stores/workinghours-store';
import UrenInvoerDialog from 'components/uren-registratie/UrenInvoerDialog.vue';

// initialize stores
const workingHoursStore = useWorkingHoursStore();

const selectedEvent = ref();
const activeView = ref();
const selectedDate = ref();
const showDialog = ref(false);
const eventCreateDate = ref();

provide('showDialog', showDialog);
provide('eventCreateDate', eventCreateDate);

const fetchEvents = function ({ view, startDate, endDate, week }) {
  workingHoursStore.getWorkingHoursBetweenDates(
    startDate.toISOString().split('T')[0],
    endDate.toISOString().split('T')[0]
  );
};

const onEventCreate = function (event) {
  eventCreateDate.value = event.start.toISOString().split('T')[0];
  showDialog.value = true;
};
</script>
<template>
  <q-page padding>
    <vue-cal
      ref="vuecal"
      v-model:active-view="activeView"
      v-model:selected-date="selectedDate"
      show-week-numbers
      today-button
      hideViewSelector
      :time="false"
      locale="nl"
      :disable-views="['years', 'day']"
      :drag-to-create-event="false"
      :editable-events="{
        title: false,
        drag: false,
        resize: false,
        delete: false,
        create: true,
      }"
      :on-event-create="onEventCreate"
      :events="workingHoursStore.workingHoursEventsBetweenDates"
      @ready="fetchEvents"
      @view-change="fetchEvents"
    >
      <template #arrow-prev>
        <i class="icon material-icons">arrow_back</i>
      </template>
      <template #arrow-next>
        <i class="icon material-icons">arrow_forward</i>
      </template>
      <template v-slot:no-event>
        <div></div>
      </template>
      <!-- Optional slot for the custom button. -->
      <template #today-button>
        <q-btn size="sm" round flat icon="my_location" />
      </template>
    </vue-cal>
    <!-- Uren invoer dialoog -->
    <UrenInvoerDialog />
  </q-page>
</template>

<style>
.vuecal__event.leisure {
  /* background-color: rgba(253, 156, 66, 0.9); */
  border: 1px solid;
  /* color: #fff; */
}
.vuecal__event.sport {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
  /* color: #fff; */
}
</style>
