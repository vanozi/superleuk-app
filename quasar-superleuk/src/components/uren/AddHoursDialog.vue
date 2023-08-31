<script setup lang="ts">
import {Ref, inject, ref} from 'vue';
import {IWorkingHours, useWorkingHours} from 'src/stores/workinghours-store';

// emits
// zodra uren zijn toegevoegd dan alle calendar events weer ophalen
const emit = defineEmits(['reFetchEvents'])
const workingHours = useWorkingHours();
const showHourAddDialog: Ref<boolean> = inject('showHourAddDialog') ?? ref(false);

const submitWorkingHours = (formValues: IWorkingHours) => {
  workingHours.addOrUpdate(formValues, function () {
    // Als de uren succesvol zijn toegevoegd aan de database dan het dialoog venster sluiten en een event emitten om de view te refreshen
    showHourAddDialog.value = false;
    emit('reFetchEvents')
  });
};

const props = defineProps<{
  addWorkingHoursForm: any;
}>();
</script>


<template>
  <q-dialog v-model="showHourAddDialog">
    <q-card style="width: 500px">
      <q-toolbar class="bg-secondary text-white">
        <q-btn flat round dense icon="add"/>
        <q-toolbar-title :style="$q.screen.lt.md ? {'font-size': '18px'} : {}">
          Uren toevoegen
        </q-toolbar-title>

        <q-btn flat round dense icon="close" @click="showHourAddDialog=false"/>
      </q-toolbar>
      <component
        v-bind:is="props.addWorkingHoursForm"
        @submit-form="submitWorkingHours"
      ></component>
    </q-card>
  </q-dialog>
</template>
