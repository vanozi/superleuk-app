<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, {DateClickArg} from '@fullcalendar/interaction';
import nlLocale from '@fullcalendar/core/locales/nl';
import {
  CalendarOptions,
  DatesSetArg,
  EventClickArg,
  EventContentArg,
  EventSourceFuncArg,
} from '@fullcalendar/core';
import {EventImpl} from '@fullcalendar/core/internal';

import {computed, defineProps, defineEmits, onMounted, ref} from 'vue';

// calendar options
const calendarOptions : CalendarOptions = {
  plugins: [dayGridPlugin, listPlugin, interactionPlugin],
  initialView: 'dayGridMonth',

}

</script>
