<script setup lang="ts">
import { Ref, inject } from 'vue';
import { useWorkingHoursStore } from 'src/stores/workinghours-store';
import { IWorkingHours } from 'src/types/typescipt-models';

// emits
const emit = defineEmits(['reFetchEvents']);

// store initializations
const workingHoursStore = useWorkingHoursStore();
const showHourEditDialog: Ref<boolean> = inject('showHourEditDialog')!;

const submitWorkingHours = (formValues: IWorkingHours) => {
  console.log(formValues)
  workingHoursStore.addOrUpdateWorkingHours(formValues, function () {
    // Als de uren succesvol zijn toegevoegd aan de database dan het dialoog venster sluiten en een event emitten om de view te refreshen
    showHourEditDialog.value = false;
    emit('reFetchEvents');
  });
};

function deleteWorkingHours(formValues : IWorkingHours) {
  workingHoursStore.deleteWorkingHours(formValues.id, function () {
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
