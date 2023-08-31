<script setup lang="ts">
import { Ref, inject } from 'vue';
import {IWorkingHours, useWorkingHours} from 'src/stores/workinghours-store';

// emits
const emit = defineEmits(['reFetchEvents']);

// store initializations
const workingHoursStore = useWorkingHours();
const showHourEditDialog: Ref<boolean> = inject('showHourEditDialog')!;

const submitWorkingHours = (formValues: IWorkingHours) => {
  workingHoursStore.addOrUpdate(formValues, function () {
    // Als de uren succesvol zijn toegevoegd aan de database dan het dialoog venster sluiten en een event emitten om de view te refreshen
    showHourEditDialog.value = false;
    emit('reFetchEvents');
  });
};

function deleteWorkingHours(formValues : IWorkingHours) {
  if(formValues.id == undefined){
    return
  }
  workingHoursStore.deleteSingle(formValues.id, function () {
    // Als de uren succesvol zijn verwijdert dan het dialoog venster sluiten en een event emitten om de view te refreshen
    showHourEditDialog.value = false;
    emit('reFetchEvents');
  })
}


const formButtonFunction: { closeForm(): void; [key: string]: any } = {
  closeForm() {
    showHourEditDialog.value = false;
  },
};

const props = defineProps<{
  editWorkingHoursForm: any;
}>();
</script>
<template>
  <q-dialog v-model="showHourEditDialog">
    <q-card style="width: 500px">
      <q-toolbar class="bg-secondary text-white">
        <q-btn flat round dense icon="edit" />
        <q-toolbar-title :style="$q.screen.lt.md ? {'font-size': '18px'} : {}">
          Uren aanpassen
        </q-toolbar-title>

        <q-btn flat round dense icon="close" @click="showHourEditDialog=false" />
      </q-toolbar>
      <component
        v-bind:is="props.editWorkingHoursForm"
        @submit-form="submitWorkingHours"
        @clickButton="(clickFunction:string)=>{formButtonFunction[clickFunction]()}"
        @deleteFormItem="deleteWorkingHours"
      ></component>

    </q-card>
  </q-dialog>
</template>
