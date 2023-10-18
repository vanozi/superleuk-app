<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import nlLocale from '@fullcalendar/core/locales/nl';
const calendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  locale: nlLocale,
};
</script>
<template>
  <FullCalendar ref="workingHoursCalendar" :options="calendarOptions" />
</template>
