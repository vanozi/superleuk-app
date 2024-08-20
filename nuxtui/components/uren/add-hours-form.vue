<script setup lang="ts">
// Import statements for dependencies
// Import other components if necessary
import type { FormSubmitEvent } from '#ui/types'
import type { UrenVoorDag, DagInvoerFormState } from '~/my-types/uren'
// Define the props the component accepts
// Define the emits
const emit = defineEmits(['close', 'submit-hours'])
// Reactive state variables
const options24Hours = Array.from({ length: 24 }, (_, i) => i)
const quarters = Array.from({ length: 4 }, (_, i) => i * 15)
const numberOfMilkings = Array.from({ length: 4 }, (_, i) => i)
const data: Ref<UrenVoorDag> = inject('dagInvoerData') as Ref<UrenVoorDag>
// Computed properties
const formState = computed<DagInvoerFormState>(() => {
  if (data) {
    const { wholeHours, minutes } = floatToHoursAndMinutes(data.value.hours)
    return {
      id: data.value.id ?? null,
      date: data.value.date,
      hours: data.value.hours,
      wholeHours: wholeHours,
      minutes: minutes,
      milkings: data.value.milkings,
      description: data.value.description,
      submitted: data.value.submitted
    }
  }
  // Return default structure if data is not available
  return {
    id: null,
    date: '',
    hours: 0,
    wholeHours: 0,
    minutes: 0,
    milkings: 0,
    description: '',
    submitted: false
  }
})

// Methods
async function onSubmit(event: FormSubmitEvent<any>) {
  emit('submit-hours', event)
}
// Lifecycle hooks

</script>

<template>
  <UForm :state="formState" class="space-y-2" @submit="onSubmit">
    <UFormGroup label="Uren" name="date">
      <div class="flex justify-start gap-2">
        <USelect v-model="formState.wholeHours" :options="options24Hours" />
        <USelect v-model="formState.minutes" :options="quarters" />
      </div>
    </UFormGroup>

    <UFormGroup label="Melkbeurten" name="milkings">
      <div class="flex justify-start">
        <USelect v-model="formState.milkings" :options="numberOfMilkings" />
      </div>
    </UFormGroup>
    <UFormGroup label="Omschrijving" name="description">
      <UTextarea v-model="formState.description" />
    </UFormGroup>
    <div class="flex justify-end gap-3">
      <UButton type="submit" variant="outline" label="Opslaan" color="primary" />
    </div>
  </UForm>
</template>
