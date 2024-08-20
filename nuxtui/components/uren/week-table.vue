<script setup lang="ts">
// Import statements for dependencies
import { useDateFormat } from '@vueuse/core'
import type { WorkingHoursResponseWithOptionalId } from '~/my-types/uren'
import { useWorkingHoursStore } from '~/stores/working-hours-store'

// Import other components if necessary

const workingHoursStore = useWorkingHoursStore()
// Define the props the component accepts
const props = defineProps({
  uren: {
    type: Array as PropType<WorkingHoursResponseWithOptionalId[]>,
    required: true,
    default: () => []
  }
})
// Define the emits
const emit = defineEmits(['showDagInvoerModal'])


const columns = [{
  key: 'date',
  label: 'Datum'
}, {
  key: 'hours',
  label: 'Uren',
}, {
  key: 'milkings',
  label: 'Melkbeurten',
}]
// Computed properties
const totalHours = computed(() => {
  return (props.uren ?? []).reduce((total, { hours }) => total + hours, 0)
})

const totalMilkings = computed(() => {
  return (props.uren ?? []).reduce((total, { milkings }) => total + milkings, 0)
})
// Methods
function selectRow(row: any) {
  if(!workingHoursStore.weekIsSubmitted)
  emit('showDagInvoerModal', row)
}

function formatDateToWeekday(date: string): string {
  return useDateFormat(new Date(date), 'dddd', { locales: 'nl-NL' }).value
}
// Lifecycle hooks
</script>

<template>
  <UCard :ui="{ header: { padding: 'p-4 sm:px-6' }, body: { padding: '' } }" class="min-w-0">
    <!-- Table -->
    <UTable :rows="uren" :columns="columns" @select="selectRow">
      <template #date-data="{ row }">
        <p>
          {{ formatDateToWeekday(row.date) }}
        </p>
      </template>
    </UTable>
    <!-- Totale aantal uren en eventueel melkbeurten -->
    <template #footer>
      <div class="flex flex-col justify-between items-end">
        <div>
          <span class="text-sm leading-5">
            Uren totaal: <span class="font-medium">{{ totalHours }}</span>
          </span>
        </div>
        <div>
          <span class="text-sm leading-5">
            Melkbeurten totaal: <span class="font-medium">{{ totalMilkings }}</span>
          </span>
        </div>
      </div>
    </template>
  </UCard>
</template>
