<script setup lang="ts">
import {
  ref,
  computed,
  Ref,
  provide,
  shallowRef,
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
const dayGridMonthView: Ref<boolean> = ref(false);
const totalWorkingHoursViewSubmitted: Ref<number> = ref(0);
const totalWorkingHoursViewNotSubmitted: Ref<number> = ref(0);
const totalWorkingHoursView: Ref<number> = ref(0);
const firstDayInView: Ref<string> = ref('');
const lastDayInView: Ref<string> = ref('');
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
  dateClick: function (info) {
    openAddHoursDialog(info.dateStr)
  },
  locale: nlLocale,
  events: handleFetchEvents,
  showNonCurrentDates: false,
  eventClick: (eventInfo: EventClickArg) => openEditHoursDialog(eventInfo.event),
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
  // de fetchInfo.endStr is een dag te laat, dus we moeten deze met 1 dag verlagen
  const fetchInfoEndStr = fetchInfo.endStr.split('T')[0];
  const date = new Date(fetchInfoEndStr);
  date.setDate(date.getDate() - 1);
  const newDateString = date.toISOString().split('T')[0];
  await api
    .get('/working_hours/between_dates/', {

      params: {
        from_date: fetchInfo.startStr.split('T')[0],
        to_date: newDateString,
      },

    })
    .then((response) => {
      datesToExcludeFromDatePicker.value = extractDatesFromResponse(
        response.data
      );
      // van de response tellen we de ingediende en niet ingediende uren op, maar eerst resetten we de boel
      totalWorkingHoursViewSubmitted.value = 0;
      totalWorkingHoursViewNotSubmitted.value = 0;
      totalWorkingHoursView.value = 0;
      response.data.forEach((event: IWorkingHours) => {
        if (event.submitted) {
          totalWorkingHoursViewSubmitted.value += event.hours;
        } else {
          totalWorkingHoursViewNotSubmitted.value += event.hours;
        }
        totalWorkingHoursView.value += event.hours;
      });
      // stuur de data naar de calendar
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
  lastDayInView.value = dateInfo.endStr;
  listWeekView.value = dateInfo.view.type == 'listWeek';
  dayGridMonthView.value = dateInfo.view.type == 'dayGridMonth';
  reFetchEvents();
}


function eventContent(arg: EventContentArg) {
  const {view, event} = arg;
  const uren = document.createElement('div');
  const melkbeurten = document.createElement('div');
  const omschrijving = document.createElement('div');
  const arrayOfDomNodes = [uren, melkbeurten, omschrijving];

  if (view.type === 'listWeek') {
    uren.innerHTML = `<strong>Uren: </strong><span style="float:right"> ${event.extendedProps.hours}</span>`;
    melkbeurten.innerHTML = `<strong>Melkbeurten: </strong><span style="float:right">${event.extendedProps.milkings}</span>`;
    omschrijving.innerHTML = `<strong>Omschrijving: </strong><em>${event.extendedProps.description}`;
  } else if (view.type === 'dayGridMonth') {
    uren.innerHTML = `<strong> U: </strong><span style="float:right">${event.extendedProps.hours}</span>`;
    melkbeurten.innerHTML = `<strong>M: </strong><span style="float:right">${event.extendedProps.milkings}</span>`;
  }

  return {domNodes: arrayOfDomNodes};
}

function eventClassNames(arg: EventContentArg) {
  const {view, event} = arg;

  if (view.type === 'dayGridMonth') {
    if (event.extendedProps.submitted) {
      return ['submitted'];
    } else {
      return ['not-submitted'];
    }
  }

  if (view.type === 'listWeek') {
    if (event.extendedProps.submitted) {
      return ['submitted'];
    }
  }
  return [];
}

function reFetchEvents() {
  workingHoursCalendarApi.value.refetchEvents();
}

function openAddHoursDialog(selectedDate?: string|undefined) {
  showHourAddDialog.value = true;
  if (selectedDate) {
    AddWorkingHoursForm.value = new WorkingHoursForms(
      new FormBuilder('opslaan', 'add-working-hours-custom-quasar')
    ).addWorkingHoursForm(undefined, selectedDate);
  } else {
    AddWorkingHoursForm.value = new WorkingHoursForms(
      new FormBuilder('opslaan', 'add-working-hours-custom-quasar')
    ).addWorkingHoursForm(datePickerOptions);
  }

}

function openEditHoursDialog(eventInfo: EventImpl) {
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
  <!--  Rij onder de calendar view voor de list week -->
  <div class="row" v-if="listWeekView">
    <q-space/>
    <q-btn-group unelevated class="q-mt-xs">
      <standard-button
        color="primary"
        label="Toevoegen"
        @click="openAddHoursDialog(undefined)"
      />
      <standard-button color="positive" label="Indienen"/>
    </q-btn-group>
  </div>
  <!--  Rij onder de calendar view voor day grid month -->
  <div class="row">
    <q-space/>
    <div style="max-width: 350px">
      <q-list separator>
        <q-item>
          <q-item-section/>
          <q-item-section side>
            <q-item-label overline class="text-weight-bolder">UREN</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section/>
          <q-item-section side>
            <q-item-label overline>Open</q-item-label>
            <q-item-label>{{ totalWorkingHoursViewNotSubmitted }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section/>
          <q-item-section side>
            <q-item-label overline>Ingediend</q-item-label>
            <q-item-label>{{ totalWorkingHoursViewSubmitted }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section/>
          <q-item-section side>
            <q-item-label overline>Totaal</q-item-label>
            <q-item-label>{{ totalWorkingHoursView }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<style>
.submitted {
  background-color: rgba(229, 255, 204, 0.99) !important;
  border-color: #E6FFCBFF !important;
}

.submitted .fc-event {
  color: black !important;
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
