<script setup lang="ts">
// Import statements for dependencies
import type { WeekTotals, WorkingHoursWeekOverviewResponse } from '~/utils/client'

// Import other components if necessary

// Define the props the component accepts
const props = defineProps({
  uren: {
    type: Array as PropType<WeekTotals[]>,
    required: true,
    default: () => []
  }
})

const columns = [{
  key: 'month',
  label: 'Maand'
},
{
  key: 'hours',
  label: 'Uren',
}]
// Computed properties
const totalHours = computed(() => {
  return (props.uren ?? []).reduce((total, { hours }) => total + hours, 0)
})

const totalMilkings = computed(() => {
  return (props.uren ?? []).reduce((total, { milkings }) => total + milkings, 0)
})
// Methods

// Lifecycle hooks
</script>

<template>
  <UCard :ui="{ header: { padding: 'p-4 sm:px-6' }, body: { padding: '' } }" class="min-w-0">
    <!-- Table -->
    <UTable :rows="uren" :columns="columns" />
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
