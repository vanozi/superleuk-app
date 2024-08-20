<script setup lang="ts">
// Import statements for dependencies
import type { WorkingHoursWeekOverviewResponse } from '~/utils/client'

// Import other components if necessary

// Define the props the component accepts
const props = defineProps({
  uren: {
    type: Array as PropType<WorkingHoursWeekOverviewResponse[]>,
    required: true,
    default: () => []
  }
})

const columns = [{
  key: 'week',
  label: 'Week'
},
{
  key: 'sum_hours',
  label: 'Uren',
}]
// Computed properties
const totalHours = computed(() => {
  return (props.uren ?? []).reduce((total, { sum_hours }) => total + sum_hours, 0)
})

const totalMilkings = computed(() => {
  return (props.uren ?? []).reduce((total, { sum_milkings }) => total + sum_milkings, 0)
})
// Methods

// Lifecycle hooks
</script>

<template>
  <UCard :ui="{ header: { padding: 'p-4 sm:px-6' }, body: { padding: '' } }" class="min-w-0">
    <!-- Table -->
    <UTable :rows="uren" :columns="columns">
      <template #expand="{ row }">
        <!-- Display week_start and week_end -->
        <div class="p-2 bg-white rounded-md mb-2">
          <div class="text-sm font-medium">
            <span>{{ row.week_start }}</span> |
            <span>{{ row.week_end }}</span>
          </div>
        </div>
        <UrenWeekTable :uren="row.working_hours" />
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
