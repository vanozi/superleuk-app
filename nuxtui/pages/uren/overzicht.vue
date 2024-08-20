<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <!-- Navbar -->
      <UDashboardNavbar title="Uren" />
      <!-- horizontal navigation -->
      <HorizontalNavigationLinksUren />
      <!-- Toolbar -->
      <UDashboardToolbar>
        <template #left>
          <div class="flex-col items-center gap-2">
            <div class="font-semibold">
              Jaar
            </div>
            <div class="text-sm">
              {{ dateManager.year }}
            </div>
          </div>
        </template>
        <template #right>
          <UButton icon="i-heroicons-chevron-double-left" color="gray" @click="dateManager.subtractYear" />
          <UButton icon="i-heroicons-chevron-double-right" color="gray" @click="dateManager.addYear" />
        </template>
      </UDashboardToolbar>
      <!-- Content -->
      <UDashboardPanelContent>
        <UDashboardSection
          icon="i-material-symbols-overview-outline-rounded"
          title="Uren overzicht"
          description="Bekijk hier je ingediende uren"
          orientation="vertical"
          class="px-4"
        />
        <UTabs :items="items">
          <template #item="{ item }">
            <div v-if="item.label === 'Weken'">
              <UrenOverviewTableWeeks :uren="workingHoursStore.weekOverview" />
            </div>
            <div v-else>
              <UrenOverviewTableMonths :uren="workingHoursStore.monthOverview" />
            </div>
          </template>
        </UTabs>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<script setup lang="ts">

// Import statements for dependencies
// Import other components if necessary
import { useDateManager } from '~/composables/useDatesManager'
import {useWorkingHoursStore} from '~/stores/working-hours-store'
// Define the props the component accepts
// Define the emits
// Reactive state variables
const dateManager = useDateManager()
const workingHoursStore = useWorkingHoursStore()
onBeforeMount(async() => {
  await workingHoursStore.getWeekOverview({fromDate : dateManager.firstDayYear.value, toDate : dateManager.lastDayYear.value}),
  await workingHoursStore.getMonthOverview({year : dateManager.year.value})})
watch(dateManager.year, async () => {
  await workingHoursStore.getWeekOverview({fromDate : dateManager.firstDayYear.value, toDate : dateManager.lastDayYear.value}),
  await workingHoursStore.getMonthOverview({year : dateManager.year.value})
})

const items = [{
  label: 'Weken',
  icon: 'i-heroicons-calendar-days',
}, {
  label: 'Maanden',
  icon: 'i-heroicons-list-bullet',
},]
// Define the provides
// Computed properties
</script>

<style scoped></style>
