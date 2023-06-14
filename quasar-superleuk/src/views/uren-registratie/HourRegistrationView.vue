<script setup lang="ts">
import UrenRegistratieCalendarComponent from 'src/components/uren-registratie/UrenRegistratieCalendarComponent.vue';
import { computed, onBeforeMount, provide, ref, shallowRef } from 'vue';
import { useWorkingHoursStore } from 'src/stores/workinghours-store';
import InvoerenDialogComponent from 'src/components/uren-registratie/InvoerenDialogComponent.vue';
import FormBuilder from 'src/builders/FormBuilder';
import WorkinghoursFormDirector from 'src/builders/WorkinghoursFormDirector';
const workingHoursStore = useWorkingHoursStore();
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

onBeforeMount(() => {
  workingHoursStore.fetchWorkingHoursLoggedInUser();
});

function openAddHoursDialog(){
  showHourEditDialog.value = true
  AddWorkingHoursForm.value =  new WorkinghoursFormDirector(
  new FormBuilder('opslaan', 'add-working-hours-form')
).addWorkingHoursForm(options, startDateView.value);
}



</script>

<template>
  <main>

    <div class="q-mx-sm">
      <UrenRegistratieCalendarComponent
        :workingHoursUser="workingHoursStore.allWorkingHours"
        @addHours="openAddHoursDialog"
        @optionsChanged="(changedOptions)=>options=changedOptions"
        @startDateChanged="(newStartDate)=>startDateView=newStartDate"
      />
    </div>
    <InvoerenDialogComponent :startDateView="startDateView" :addWorkingHoursForm="AddWorkingHoursForm" />
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
