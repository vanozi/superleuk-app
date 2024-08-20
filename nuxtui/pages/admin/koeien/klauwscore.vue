<script lang="ts" setup>
import { useAdminKlauwscoreStore } from '~/stores/admin/klauwscore-store'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import type { Range } from '~/types'
import { sub, format, isSameDay, type Duration } from 'date-fns'

definePageMeta({
  middleware: 'admin',
  layout: 'admin'
})
const klauwscoreStore = useAdminKlauwscoreStore()
const toast = useToast()

const range = ref<Range>({ start: sub(new Date(), { months: 6 }), end: new Date() })

onBeforeMount(async() => {
  await klauwscoreStore.getKlauwscoreData()
})

const downloadCsv = async() => {
      try {
        // Send GET request to download CSV from the FastAPI endpoint
        const response = await klauwscoreStore.downloadKlauwScore(async function () { toast.add({ icon:'i-heroicons-check-badge',  title: 'Succes', description: 'Klauwscore gedownload' })}, function (errorMessage:string) { toast.add({ icon:'i-heroicons-shield-exclamation', color:'red',  title: 'Fout', description: errorMessage }) })


        // Create a Blob from the response data
        const blob = new Blob([response], { type: 'text/csv' })

        // Create a link element
        const link = document.createElement('a')

        // Create a URL for the Blob and set it as the href for the link
        link.href = URL.createObjectURL(blob)

        // Set the download attribute with a filename
        link.setAttribute('download', 'klauwscore.csv')

        // Append the link to the body (required for Firefox)
        document.body.appendChild(link)

        // Programmatically trigger the click event
        link.click()

        // Remove the link from the document
        document.body.removeChild(link)
      } catch (error) {
        console.error('Error downloading CSV:', error)
      }

    }



// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)



const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: true,

})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="Klauwgezondheid"
      />
      <UDashboardToolbar>
        <template #left>
          <UButton variant="outline" label="Download klauwscore" trailing-icon="i-material-symbols-downloading" :loading="klauwscoreStore.loading" @click="downloadCsv" />
        </template>
      </UDashboardToolbar>
      <UDashboardPanelContent>
        <UDashboardCard ref="cardRef" :ui="{ body: { padding: '!pb-3 !px-0' } as any }">
          <template #header>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
                Koegezondheid
              </p>
              <p class="text-3xl text-gray-900 dark:text-white font-semibold">
                Klauwscore
              </p>
            </div>
          </template>
          <UDashboardToolbar>
            <template #left>
              <CommonDateRangePicker v-model="range" />
            </template>
          </UDashboardToolbar>
          <Bar
            v-if="klauwscoreStore.distinctNotaties"
            id="my-chart-id"
            :options="chartOptions"
            :data="klauwscoreStore.distinctNotaties(range.start, range.end)"
          />
        </UDashboardCard>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
