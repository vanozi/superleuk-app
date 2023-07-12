<script setup lang="ts">
import {
  ref,
  computed,
  Ref,
  provide,
  shallowRef,
  defineComponent,
  h,
} from 'vue';
import {api} from 'src/boot/axios';
import FormBuilder from 'src/forms/form-builder';
import WorkingHoursForms from 'src/forms/working-hours-forms';
import {IWorkingHours} from 'src/types/typescipt-models';
import StandardButton from 'src/components/quasar/StandardButton.vue';


import InvoerenDialogComponent from 'src/components/uren-registratie/InvoerenDialogComponent.vue';
import AanpassenDialogComponent from 'src/components/uren-registratie/AanpassenDialogComponent.vue';

import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import nlLocale from '@fullcalendar/core/locales/nl';
import {
  CalendarOptions,
  DatesSetArg,
  EventClickArg,
  EventContentArg,
  EventSourceFuncArg,
} from '@fullcalendar/core';
import {EventImpl} from '@fullcalendar/core/internal';
import {useDatePickerDates} from 'src/composables/use-date-picker-dates';

const workingHoursCalendar = ref();
const listWeekView: Ref<boolean> = ref(false);
const firstDayInView: Ref<string> = ref('');
const showHourAddDialog: Ref<boolean> = ref(false);
const showHourEditDialog: Ref<boolean> = ref(false);
const EditWorkingHoursForm: any = shallowRef();
const AddWorkingHoursForm: any = shallowRef();

provide('showHourAddDialog', showHourAddDialog);
provide('showHourEditDialog', showHourEditDialog);

const workingHoursCalendarApi = computed(() =>
  workingHoursCalendar.value.getApi()
);

const {
  start: datePickerStart,
  end: datePickerEnd,
  datesToExclude: datesToExcludeFromDatePicker,
  datePickerOptions,
} = useDatePickerDates();


const calendarOptions: CalendarOptions = {
  views: {
    listWeek: {buttonText: 'Week'},
    dayGridMonth: {buttonText: 'Maand'},
  },
  headerToolbar: {end: 'listWeek,dayGridMonth,customprev,customnext'},
  plugins: [dayGridPlugin, interactionPlugin, listPlugin],
  initialView: 'listWeek',
  displayEventTime: false,
  editable: true,
  selectable: true,
  height: 'auto',
  datesSet: handleDatesSet,
  locale: nlLocale,
  events: handleFetchEvents,
  showNonCurrentDates: false,
  eventClick: (eventInfo: EventClickArg) =>
    openEditHoursDialog(eventInfo.event),
  eventClassNames: (arg: EventContentArg) => eventClassNames(arg),
  eventContent: (arg: EventContentArg) => eventContent(arg),

  customButtons: {
    customprev: {
      text: '',
      icon: 'chevron-left',
      click: function () {
        workingHoursCalendarApi.value.prev();
        workingHoursCalendarApi.value.render();
      },
    },
    customnext: {
      text: '',
      icon: 'chevron-right',
      click: function () {
        workingHoursCalendarApi.value.next();
        workingHoursCalendarApi.value.render();
      },
    },
    addHours: {
      text: 'Toevoegen',
      click: openAddHoursDialog,
    },
    submitHours: {
      text: 'Indienen',
    },
  },
};

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
      datesToExcludeFromDatePicker.value = extractDatesFromResponse(
        response.data
      );
      // loop over the response data and set an extra property backgroundColor based on the status of the submitted property
      // #59A96A for true #c0c0c0 for false
      response.data.forEach((event: any) => {
        event.backgroundColor = event.submitted
          ? '#59A96A'
          : '#c0c0c0';
        event.borderColor = event.submitted
          ? '#59A96A'
          : '#c0c0c0';
      });
      successCallback(response.data);
    })
    .catch((error) => {
      failureCallback(error);
    });
}

function handleDatesSet(dateInfo: DatesSetArg) {
  datePickerStart.value = dateInfo.start;
  datePickerEnd.value = dateInfo.end;
  firstDayInView.value = dateInfo.startStr;
  listWeekView.value = dateInfo.view.type == 'listWeek';
}

function eventContent(arg: EventContentArg) {
  const {view, event} = arg;
  const uren = document.createElement('div');
  const melkbeurten = document.createElement('div');
  const omschrijving = document.createElement('div');
  const arrayOfDomNodes = [uren, melkbeurten, omschrijving];
  console.log(event)

  if (view.type === 'listWeek') {
    console.log(event)
    uren.innerHTML = `<strong>Uren: </strong><span style="float:right"> ${event.extendedProps.hours_formatted_for_frontend}</span>`;
    melkbeurten.innerHTML = `<strong>Melkbeurten: </strong><span style="float:right">${event.extendedProps.milkings}</span>`;
    omschrijving.innerHTML = `<strong>Omschrijving: </strong><em>${event.extendedProps.description}`;
  } else if (view.type === 'dayGridMonth') {
    uren.innerHTML = `<strong> U: </strong><span style="float:right">${event.extendedProps.hours_formatted_for_frontend}</span>`;
    melkbeurten.innerHTML = `<strong>M: </strong><span style="float:right">${event.extendedProps.milkings}</span>`;
  }

  return {domNodes: arrayOfDomNodes};
}

function eventClassNames(arg: EventContentArg) {
  const {view} = arg;
  if (view.type === 'dayGridMonth') {
    const {event} = arg;
    if (event.extendedProps.submitted) {
      return ['submitted']
    } else {
      return ['not-submitted']
    }
  }
   if (view.type === 'listWeek') {
    const {event} = arg;
    if (event.extendedProps.submitted) {
      return ['submitted']
    }
  }
}
function reFetchEvents() {
  workingHoursCalendarApi.value.refetchEvents();
}

function openAddHoursDialog() {
  showHourAddDialog.value = true;
  AddWorkingHoursForm.value = new WorkingHoursForms(
    new FormBuilder('opslaan', 'add-working-hours-custom-quasar')
  ).addWorkingHoursForm(datePickerOptions);
}

function openEditHoursDialog(eventInfo: EventImpl) {
  console.log(eventInfo)
  showHourEditDialog.value = true;
  let workingHoursItem: IWorkingHours = {
    id: Number(eventInfo.id),
    date: eventInfo.startStr,
    hours: eventInfo.extendedProps.hours,
    description: eventInfo.extendedProps.description,
    submitted: eventInfo.extendedProps.submitted,
    hours_formatted_for_frontend:
    eventInfo.extendedProps.hours_formatted_for_frontend,
  };
  EditWorkingHoursForm.value = new WorkingHoursForms(
    new FormBuilder('opslaan', 'edit-working-hours-custom-quasar')
  ).editWorkingHoursForm(workingHoursItem);
}

function extractDatesFromResponse(workingHoursArray: IWorkingHours[]) {
  return workingHoursArray.map((obj) => obj.date);
}
</script>

<template>
  <FullCalendar ref="workingHoursCalendar" :options="calendarOptions"/>
  <InvoerenDialogComponent
    :add-working-hours-form="AddWorkingHoursForm"
    @re-fetch-events="reFetchEvents"
  />
  <AanpassenDialogComponent
    :edit-working-hours-form="EditWorkingHoursForm"
    @re-fetch-events="reFetchEvents"
  />
  <div class="row">
    <q-space/>
    <q-btn-group unelevated class="q-mt-xs">
      <standard-button
        v-if="listWeekView"
        color="primary"
        label="Toevoegen"
        @click="openAddHoursDialog"
      />
      <standard-button v-if="listWeekView" color="positive" label="Indienen"/>
    </q-btn-group>
  </div>
</template>

<style>
.submitted {
  background-color: lightgreen!important;
  border-color: lightgreen !important;
}
.submitted .fc-event{
  color : black !important;
}

.not-submitted {
  background-color: lightgrey !important;
  border-color: lightgrey !important;
}

.fc-event-main {
  color: black !important;
}


/* Mobile Styles */
@media only screen and (max-width: 480px) {
  /* FullCalendar Styles for Mobile Here */
  .fc .fc-toolbar-title {
    font-size: 14px !important; /* Smaller font size */
    font-weight: 400;
  }

  .fc .fc-customprev-button,
  .fc .fc-customnext-button {
    background-color: white;
    font-size: 12px !important; /* Smaller button size */
  }


  .fc .fc-listWeek-button,
  .fc .fc-dayGridMonth-button {
    font-size: 12px !important;
  }
}

.fc .fc-button-active {
  background-color: #F3A712 !important;
}
</style>
