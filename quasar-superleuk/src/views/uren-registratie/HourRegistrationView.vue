<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import nlLocale from '@fullcalendar/core/locales/nl';
import interactionPlugin from '@fullcalendar/interaction';
import { ref, onMounted, reactive } from 'vue';

const calendar1 = ref(null);
const calendar1Api = ref(null);
const showModal = ref(false);
const weekRange = reactive({});

const calendarOptions1 = {
  headerToolbar: {
    start: 'title', // will normally be on the left. if RTL, will be on the right
    center: '',
    end: 'customprev,customnext', // will normally be on the right. if RTL, will be on the left
  },
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridWeek',
  editable: true, // important for activating event interactions!
  selectable: true, // important for activating date selectability!
  selectHelper: true,
  select: function (start, end) {
    console.log(start, end);
    showModal.value = true;
  },
  locale: nlLocale,
  resources: [
    // your resource list
  ],
  events: [
    {
      allDay: true,
      title: 'BCH237',
      start: '2023-03-21',
      extendedProps: {
        department: 'BioChemistry',
      },
      description: 'Lecture',
    },
    // more events ...
  ],
  customButtons: {
    customprev: {
      text: '',
      icon: 'chevron-left',
      click: function () {
        calendar1Api.value.prev();
        calendar1Api.value.render();
        weekRange.start = calendar1Api.value.view.activeStart;
        weekRange.end = calendar1Api.value.view.activeEnd;
      },
    },
    customnext: {
      text: '',
      icon: 'chevron-right',
      click: function () {
        calendar1Api.value.next();
        calendar1Api.value.render();
        weekRange.start = calendar1Api.value.view.activeStart;
        weekRange.end = calendar1Api.value.view.activeEnd;
      },
    },
  },
};

onMounted(() => {
  if (calendar1.value) {
    calendar1Api.value = calendar1.value.getApi();
    weekRange.start = calendar1Api.value.view.activeStart;
    weekRange.end = calendar1Api.value.view.activeEnd;
  }
});
</script>

<template>
  <main>
    {{ weekRange.start }}
    {{ weekRange.end }}
    <FullCalendar ref="calendar1" :options="calendarOptions1" />
  </main>
</template>

<style>
.fc .fc-toolbar-title {
  font-size: 15px;
}
</style>
