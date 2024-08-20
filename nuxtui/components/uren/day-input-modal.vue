<script setup lang="ts">
import { inject } from 'vue'
import type { FormSubmitEvent } from '#ui/types'
import { useWorkingHoursStore } from '~/stores/working-hours-store'

const toast = useToast()
const workingHoursStore = useWorkingHoursStore()
const isVisible = ref(inject('isDagInvoerModalOpen', false))
// Methods
function closeModal() {
  isVisible.value = false
}

async function submitHours(event: FormSubmitEvent<any>) {
  const dataVoorRequest = convertToUrenVoorDag(event.data)
  await workingHoursStore.addOrUpdateWorkingHours({ requestBody: dataVoorRequest }, function () { toast.add({ icon: 'i-heroicons-check-badge', title: 'Succes', description: 'Uren zijn aangepast' }), closeModal() }, function (errorMessage: string) { toast.add({ icon: 'i-heroicons-shield-exclamation', color: 'red', title: 'Fout', description: errorMessage }), closeModal() })
}
</script>

<template>
  <UDashboardModal
    v-model="isVisible"
    title="Uren aanpassen"
    description="Pas de uren voor deze dag aan."
    :ui="{ width: 'sm:max-w-md' }"
  >
    <UrenAddHoursForm @close="closeModal" @submit-hours="submitHours" />
  </UDashboardModal>
</template>
