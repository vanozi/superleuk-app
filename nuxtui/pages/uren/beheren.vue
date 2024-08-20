<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <!-- Navbar -->
      <UDashboardNavbar title="Uren" />
      <!-- horizontal navigation -->
      <HorizontalNavigationLinksUren />
      <UDashboardToolbar>
        <template #left>
          <div class="flex-col items-center gap-2">
            <div class="font-semibold">
              Week {{ dateManager.weekNumber }}
            </div>
            <div class="text-sm">
              {{ dateManager.weekDisplay.value }}
            </div>
          </div>
        </template>
        <template #right>
          <UButton
            v-if="!workingHoursStore.weekIsSubmitted"
            label="Indienen"
            leading-icon="i-heroicons-arrow-up-tray"
            color="gray"
            variant="outline"
            @click="workingHoursStore.submitWeek(workingHoursStore.workingHoursForWeek(dateManager.weekDates))"
          />
          <UButton
            v-if="workingHoursStore.weekIsSubmitted"
            disabled
            label="Ingediend"
            leading-icon="i-heroicons-check"
            color="primary"
            variant="outline"
          />
          <UButton icon="i-heroicons-chevron-double-left" color="gray" @click="dateManager.subtractWeek" />
          <UButton icon="i-heroicons-chevron-double-right" color="gray" @click="dateManager.addWeek" />
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <!-- Content -->
        <UDashboardSection
          icon="i-ic-outline-manage-history"
          title="Uren beheren"
          description="Beheer hier je uren per week"
          orientation="vertical"
          class="px-4"
        />

        <UrenWeekTable :uren="workingHoursStore.workingHoursForWeek(dateManager.weekDates)" @show-dag-invoer-modal="openDagInvoerModal" />
        <UrenDayInputModal />
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<script setup lang="ts">
// Import statements for dependencies
import { provide, ref } from 'vue'
import { useWorkingHoursStore } from '~/stores/working-hours-store'
// Import other components if necessary
import { useDateManager } from '~/composables/useDatesManager'
import type { WorkingHoursResponseWithOptionalId } from '~/my-types/uren'
// Define the props the component accepts
// Define the emits
// Reactive state variables
const workingHoursStore = useWorkingHoursStore()
const dateManager = useDateManager()



onBeforeMount(async () => {
  await workingHoursStore.fetchWorkingHoursBetweenDatesLoggedInUser({fromDate: dateManager.weekDates.value[0], toDate: dateManager.weekDates.value[6]})
})
watch(dateManager.weekDates, async () => {
  await workingHoursStore.fetchWorkingHoursBetweenDatesLoggedInUser({fromDate: dateManager.weekDates.value[0], toDate: dateManager.weekDates.value[6]})
})

const urenData = ref()
const dagInvoerModalOpen = ref(false)

// Define the provides
provide('dagInvoerData', urenData)
provide('isDagInvoerModalOpen', dagInvoerModalOpen)
// Computed properties

// Methods
const openDagInvoerModal = (data: WorkingHoursResponseWithOptionalId) => {
  urenData.value = data
  dagInvoerModalOpen.value = true
}
// Lifecycle hooks
</script>

<style scoped></style>
