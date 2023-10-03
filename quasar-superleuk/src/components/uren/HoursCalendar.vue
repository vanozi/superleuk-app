<script setup lang="ts">
import {
  ref,
  computed,
  Ref,
  provide,
  shallowRef,
} from 'vue';
import FormBuilder from 'src/forms/form-builder';
import WorkingHoursForms from 'src/forms/working-hours-forms';
import StandardButton from 'components/app/AppButton.vue';


import InvoerenDialogComponent from 'components/uren/AddHoursDialog.vue';
import AanpassenDialogComponent from 'components/uren/EditHoursDialog.vue';

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
import {useDatePickerDates} from 'src/composables/use-date-picker-dates';
import {IWorkingHours, useWorkingHours} from "stores/workinghours-store";
import {useAccountStore} from "stores/account-store";
import {getDatesBetweenTwoDatesAsString} from "src/helpers/date-helpers";

const workingHoursCalendar = ref();
const listWeekView: Ref<boolean> = ref(false);
const dayGridMonthView: Ref<boolean> = ref(false);
const firstDayInView: Ref<string> = ref('');
const lastDayInView: Ref<string> = ref('');
const showAddDialog: Ref<boolean> = ref(false);
const showEditDialog: Ref<boolean> = ref(false);
const editForm: any = shallowRef();
const addForm: any = shallowRef();

provide('showHourAddDialog', showAddDialog);
provide('showHourEditDialog', showEditDialog);

const workinghoursStore = useWorkingHours();

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
  dateClick: handleDateClick,
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
  try {
    const response_data: IWorkingHours[] = await workinghoursStore.getAllBetweenDates(fetchInfo.startStr.split('T')[0], newDateString);
    datesToExcludeFromDatePicker.value = extractDatesFromResponse(
        response_data)
    // als het om listweek gaat dan de week aanvullen met de dagen die niet in de database staan
    if (listWeekView.value == true) {
      const allDatesInWeek = getDatesBetweenTwoDatesAsString(fetchInfo.start, fetchInfo.end)
      const datesInResponse = extractDatesFromResponse(response_data)
      const datesNotInResponse = allDatesInWeek.filter(date => !datesInResponse.includes(date))
      const workingHoursNotInResponse = datesNotInResponse.map(date => {
        return {
          date: date,
          hours: 0,
          milkings: 0,
          description: '',
          submitted: response_data.length > 0 ? response_data[0].submitted : false,
          hours_formatted_for_frontend: '00:00'
        }
      })
      response_data.push(...workingHoursNotInResponse)
    }
    successCallback(response_data)
  } catch (error) {
    failureCallback()
  }
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

function handleDateClick(info: DateClickArg) {
  // als uren van die week al zijn ingediend dan niet openen
  // openAddHoursDialog(info.dateStr)
}

function eventContent(arg: EventContentArg) {
  const {view, event} = arg;
  const uren = document.createElement('div');
  const melkbeurten = document.createElement('div');
  const omschrijving = document.createElement('div');
  const arrayOfDomNodes = [uren, melkbeurten, omschrijving];

  if (view.type === 'listWeek') {
    uren.innerHTML = `<strong>Uren: </strong><span style="float:right"> ${event.extendedProps.hours}</span>`;
    if (useAccountStore().hasUserRole('melker')) {
      melkbeurten.innerHTML = `<strong>Melkbeurten: </strong><span style="float:right">${event.extendedProps.milkings}</span>`;
    }
    omschrijving.innerHTML = `<strong>Omschrijving: </strong><em>${event.extendedProps.description}`;
  } else if (view.type === 'dayGridMonth') {
    uren.innerHTML = `<strong> U: </strong><span style="float:right">${event.extendedProps.hours}</span>`;
    if (useAccountStore().hasUserRole('melker')) {
      melkbeurten.innerHTML = `<strong>M: </strong><span style="float:right">${event.extendedProps.milkings}</span>`;
    }
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

function openAddHoursDialog(selectedDate?: string | undefined) {
  showAddDialog.value = true;
  if (selectedDate) {
    addForm.value = new WorkingHoursForms(
        new FormBuilder('opslaan', 'add-working-hours-custom-quasar')
    ).addWorkingHoursForm(undefined, selectedDate);
  } else {
    addForm.value = new WorkingHoursForms(
        new FormBuilder('opslaan', 'add-working-hours-custom-quasar')
    ).addWorkingHoursForm(datePickerOptions);
  }
}

async function indienenHours() {
  for (const workingHours of workinghoursStore.workingHoursBetweenDates) {
    workingHours.submitted = true;
    await workinghoursStore.addOrUpdate(workingHours, function () {
      reFetchEvents()
    });
  }


}

function openEditHoursDialog(eventInfo: EventImpl) {
  // in het maand overzicht kun je de uren niet aanpassen
  if (eventInfo._context.viewSpec.type == 'dayGridMonth') {
    return
  }
  // in de week view kun je alleen de uren aanpassen als ze nog niet zijn ingediend
  if (eventInfo._context.viewSpec.type == 'listWeek' && eventInfo.extendedProps.submitted) {
    return
  }
  showEditDialog.value = true;
  let workingHoursItem: IWorkingHours = {
    id: Number(eventInfo.id),
    date: eventInfo.startStr,
    hours: eventInfo.extendedProps.hours,
    milkings: eventInfo.extendedProps.milkings,
    description: eventInfo.extendedProps.description,
    submitted: eventInfo.extendedProps.submitted,
    hours_formatted_for_frontend:
    eventInfo.extendedProps.hours_formatted_for_frontend,
  };
  editForm.value = new WorkingHoursForms(
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
      :add-working-hours-form="addForm"
      @re-fetch-events="reFetchEvents"
  />
  <AanpassenDialogComponent
      :edit-working-hours-form="editForm"
      @re-fetch-events="reFetchEvents"
  />
  <!--  Rij onder de calendar view voor de list week -->
  <div class="row" v-if="listWeekView">
    <q-space/>
    <q-btn-group unelevated class="q-mt-xs">
<!--      <standard-button-->
<!--          outline-->
<!--          color="primary"-->
<!--          label="Toevoegen"-->
<!--          @click="openAddHoursDialog()"-->
<!--          :disabled="(workinghoursStore.workingHoursInViewSubmittedComputed!= 0 && workinghoursStore.totalWorkingHoursInViewComputed==workinghoursStore.workingHoursInViewSubmittedComputed) || workinghoursStore.workingHoursBetweenDates.length >= 7"-->
<!--      />-->
      <standard-button
          outline
          color="positive"
          label="Indienen"
          @click="indienenHours()"
          :disabled="workinghoursStore.totalWorkingHoursInViewComputed==workinghoursStore.workingHoursInViewSubmittedComputed"
      />
    </q-btn-group>
  </div>
  <!--  Rij onder de calendar view voor day grid month -->
  <div class="row">
    <q-space/>
    <div style="max-width: 350px" v-if="useAccountStore().hasUserRole('melker')">
      <q-list separator>
        <q-item>
          <q-item-section/>
          <q-item-section side>
            <q-item-label overline class="text-weight-bolder">MELKBEURTEN</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section/>
          <q-item-section side>
            <q-item-label>{{ workinghoursStore.totalMilkingsInViewComputed }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
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
            <q-item-label>{{ workinghoursStore.workingHoursInViewNotSubmittedComputed }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section/>
          <q-item-section side>
            <q-item-label overline>Ingediend</q-item-label>
            <q-item-label>{{ workinghoursStore.workingHoursInViewSubmittedComputed }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section/>
          <q-item-section side>
            <q-item-label overline>Totaal</q-item-label>
            <q-item-label>{{ workinghoursStore.totalWorkingHoursInViewComputed }}</q-item-label>
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
  background-color: #0b212d !important;
}
</style>
