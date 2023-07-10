<script setup lang="ts">
import UrenRegistratieCalendarComponent from 'src/components/uren-registratie/UrenRegistratieCalendarComponent.vue';
import { computed, provide, ref, shallowRef } from 'vue';
import FormBuilder from 'src/forms/form-builder'
import WorkingHoursForms from 'src/forms/working-hours-forms';
const showHourEditDialog = ref(false);
const options = ref()
const startDateView = ref('')
const AddWorkingHoursForm = shallowRef()
const computedOptions =computed(()=>{
  if(options.value == undefined){
    return []
  }
  else{
    return options.value
  }
})
provide('showHourEditDialog', showHourEditDialog);
provide('options', computedOptions)



function openAddHoursDialog(){
  showHourEditDialog.value = true
  AddWorkingHoursForm.value =  new WorkingHoursForms(
  new FormBuilder('opslaan', 'add-working-hours-custom-quasar')
).addWorkingHoursForm(options);
}



</script>

<template>
  <main>

    <div class="q-mx-sm">
      <UrenRegistratieCalendarComponent
      />
    </div>
  </main>
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
