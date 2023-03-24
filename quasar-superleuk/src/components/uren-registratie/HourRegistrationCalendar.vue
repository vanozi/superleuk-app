<script setup>
import { ref, provide } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { useWorkingHoursStore } from 'src/stores/workinghours-store';
import UrenInvoerDialog from 'src/components/uren-registratie/UrenInvoerDialog.vue';
import UrenAanpassenDialog from 'src/components/uren-registratie/UrenAanpassenDialog.vue';
import FormBuilder from 'src/builders/FormBuilder';
import FormDirector from 'src/builders/FormDirector';

const activeView = ref();
const selectedDate = ref();
const selectedEvent = ref();
const showEventCreateDialog = ref(false);
const showEventEditDialog = ref(false);
const workingHoursStore = useWorkingHoursStore();
provide('showEventCreateDialog', showEventCreateDialog);
provide('showEventEditDialog', showEventEditDialog);
provide('selectedEvent', selectedEvent);

const alert = ref(false);

const onEventCreate = function (event) {
  showEventCreateDialog.value = true;
};

const onEventClick = function (event, e) {
  // selectedEvent.value = event;
  // showEventCreateDialog.value = true;
  // e.stopPropagation();
  alert.value = true;
};
</script>
<template>
  <q-page>
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
      :events="workingHoursStore.workingHoursEventsLoggedInUserComputed"
      :on-event-create="onEventCreate"
      :on-event-click="onEventClick"
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

    <!-- dialog -->
    <UrenInvoerDialog />
    <UrenAanpassenDialog />

    <!-- Test -->
    <q-btn label="Alert" color="primary" @click="alert = true" />
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
          perferendis totam, ea at omnis vel numquam exercitationem aut, natus
          minima, porro labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
