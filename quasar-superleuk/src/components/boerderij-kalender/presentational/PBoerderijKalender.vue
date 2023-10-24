<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {DateClickArg} from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
import {CalendarOptions} from '@fullcalendar/core';
import nlLocale from '@fullcalendar/core/locales/nl';

const calendarOptions: CalendarOptions = {
  locale: nlLocale,
  plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  editable: true,
  // events
  initialEvents: [
    {
      title: 'event1',
      start: '2023-10-14',
      allDay: true
    },
    {
      title: 'event2',
      start: '2023-10-13',
      end: '2023-10-15',
      allDay: true
    },
    {
      title: 'event3',
      start: '2023-10-08T12:30:00',
      end: '2023-10-08T13:30:00',
      allDay: false // will make the time show
    }
  ],
  //  Date Clicking & Selecting
  selectable: true,
  // Triggered when a date/time selection is made
  select: function (selectionInfo) {
    alert('selected ' + selectionInfo.startStr + ' to ' + selectionInfo.endStr);
  },


};
</script>
<template>
  <FullCalendar ref="workingHoursCalendar" :options="calendarOptions"/>
</template>
