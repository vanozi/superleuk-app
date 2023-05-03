<script setup lang="ts">

import { inject } from 'vue';

const showHourEditDialog = inject('showHourEditDialog');

const submitWorkingHours = (formValues: any) => {
  console.log(formValues);
};

const props = defineProps<{
  startDateView? : string
  addWorkingHoursForm : any
}>();

</script>
<template>
  <q-dialog v-model="showHourEditDialog">
    <q-card style="width: 500px">
      <!-- <addWorkingHoursForm @submit-form="submitWorkingHours" /> -->
      <component v-bind:is="props.addWorkingHoursForm" @submit-form="submitWorkingHours"></component>
    </q-card>
  </q-dialog>
</template>
