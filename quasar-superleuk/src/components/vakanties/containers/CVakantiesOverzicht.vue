<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import nlLocale from '@fullcalendar/core/locales/nl';
import SingleRow from 'components/app/content-layout/SingleRow.vue'
import { useVakantiesStore } from 'src/stores/vakanties-store';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref } from 'vue';
import {
  CalendarOptions
} from '@fullcalendar/core';

const vakantiesStore = useVakantiesStore();

// Define a flag to track whether resources are loaded
const resourcesLoaded = ref(false);

async function getResourcesForCalendar(fetchInfo, successCallback, failureCallback) {
  // Get the resources from the store
  const resources = await vakantiesStore.fetchResources();
  // Convert the store to refs
  successCallback(resources);
};

async function getVakantieEvensForCalendar(fetchInfo, successCallback, failureCallback) {
  // Get the resources from the store
  const resources = await vakantiesStore.fetchVakanties();
  // Convert the store to refs
  successCallback(resources);
};


function getResourceGroupLabelContent(arg) {
  console.log(arg.groupValue)
  if (arg.groupValue === 1) {
    return 'Fulltime'
  } else {
    return 'Parttime'
  }
}


const vakantieCalendaOptions: CalendarOptions = {
  schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
  plugins: [resourceTimelinePlugin],
  initialView: 'resourceTimelineMonth',
  locale: nlLocale,
  resourceAreaHeaderContent: 'Medewerkers',
  resources: getResourcesForCalendar,
  resourceOrder: 'groupId, title',
  resourceGroupField: 'groupId',
  resourceGroupLabelContent: getResourceGroupLabelContent,
  events: getVakantieEvensForCalendar,

}



</script>
<template>
  <SingleRow>
    <FullCalendar ref="workingHoursCalendar" :options="vakantieCalendaOptions" />
  </SingleRow>
</template>
