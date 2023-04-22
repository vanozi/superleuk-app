<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import nlLocale from '@fullcalendar/core/locales/nl';
import interactionPlugin from '@fullcalendar/interaction';
import { ref, computed } from 'vue';
import {
  CalendarOptions,
  DatesSetArg,
  EventContentArg,
  EventMountArg,
  EventSourceFuncArg,
  EventSourceInput,
} from '@fullcalendar/core';
import { useWorkingHoursStore } from 'src/stores/workinghours-store';
import { api } from 'src/boot/axios';
const workingHoursStore = useWorkingHoursStore();
const showModal = ref(false);
const workingHoursCalendar = ref();
const calendarOptions: CalendarOptions = {
  buttonText: {
    listWeek: 'Week',
  },
  headerToolbar: {
    end: 'listWeek,dayGridMonth,customprev,customnext', // will normally be on the right. if RTL, will be on the left
  },
  footerToolbar: {
    right: 'addHours,submitHours',
  },
  plugins: [dayGridPlugin, interactionPlugin, listPlugin],
  initialView: 'listWeek',
  displayEventTime: false,
  editable: true,
  selectable: true,
  height: 'auto',
  datesSet: handleDatesSet,
  locale: nlLocale,
  events: handleFetchEvents,
  eventContent: function (arg: EventContentArg) {
    if (arg.view.type == 'listWeek') {
      let uren = document.createElement('div');
      uren.innerHTML = `<strong>Uren: </strong><span style="float:right;"> ${arg.event.extendedProps.hours}</span>`;
      let melkbeurten = document.createElement('div');
      melkbeurten.innerHTML = `<strong>Melkbeurten: </strong><span style="float:right;"> ${arg.event.extendedProps.milkings}</span>`;
      let omschrijving = document.createElement('div');
      omschrijving.innerHTML = `<strong>Omschrijving: </strong><em> ${arg.event.extendedProps.description}`;
      let arrayOfDomNodes = [uren, melkbeurten, omschrijving];
      return { domNodes: arrayOfDomNodes };
    } else if (arg.view.type == 'dayGridMonth') {
      let uren = document.createElement('div');
      uren.innerHTML = `<strong>U: </strong><span style="float:right;"> ${arg.event.extendedProps.hours}</span>`;
      let melkbeurten = document.createElement('div');
      melkbeurten.innerHTML = `<strong>M: </strong><span style="float:right;"> ${arg.event.extendedProps.milkings}</span>`;
      let arrayOfDomNodes = [uren, melkbeurten];
      return { domNodes: arrayOfDomNodes };
    }
  },
  customButtons: {
    customprev: {
      text: '',
      icon: 'chevron-left',
      click: function () {
        workingHoursCalendarApi.value.prev();
        workingHoursCalendarApi.value.render();
        // console.log(
        //   workingHoursCalendarApi.value.getEventSources()[0].refetch()
        // );
      },
    },
    customnext: {
      text: '',
      icon: 'chevron-right',
      click: function () {
        workingHoursCalendarApi.value.next();
        workingHoursCalendarApi.value.render();
        // viewDateRange.start = calendar1Api.value.view.activeStart;
        // viewDateRange.end = calendar1Api.value.view.activeEnd;
      },
    },
    addHours: {
      text: 'Toevoegen',
      click: function () {
        showModal.value = true;
      },
    },
    submitHours: {
      text: 'Indienen',
      click: function () {
        showModal.value = true;
      },
    },
  },
};

function handleDatesSet(dateInfo: DatesSetArg) {
  console.log(dateInfo.startStr, dateInfo.endStr);
}
async function handleFetchEvents(
  fetchInfo: EventSourceFuncArg,
  successCallback: any,
  failureCallback: any
) {
  await api
    .get('/working_hours/between_dates/', {
      params: {
        from_date: fetchInfo.startStr.split('T')[0],
        to_date: fetchInfo.endStr.split('T')[0],
      },
    })
    .then((response) => {
      successCallback(response.data);
    })
    .catch((error) => {
      failureCallback(error);
    });
}

const workingHoursCalendarApi = computed(() => {
  return workingHoursCalendar.value.getApi();
});
</script>

<template>
  <FullCalendar ref="workingHoursCalendar" :options="calendarOptions" />
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
