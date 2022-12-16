<script>
export default {
  name: 'IndexPage',
}
</script>

<script setup>
import ExampleChart from 'src/components/charts/tankChart.vue'
import { ref, computed } from 'vue'

const dateRange = ref({ from: '2020/07/08', to: '2020/07/17' })
const model = ref({ from: '2020/07/08', to: '2020/07/17' })

const fromDate = computed(() => {
  return dateRange.value.from
})

const toDate = computed(() => {
  return dateRange.value.to
})

const inputDateRagenText = computed(() => {
  return `${fromDate.value} - ${toDate.value}`
})
</script>

<template>
  <q-page>
    <div class="fit row wrap justify-center items-start q-ma-md">
      <div class="col-6 self-center">
        <q-card class="q-ma-md">
          <q-card-section>
            <div class="text-h6">Tankdata</div>
            <div class="text-subtitle2">Totaal aantal liters per dag (uitgezonderd klein materiaal)</div>
          </q-card-section>
          <q-card-section>
            <ExampleChart />
          </q-card-section>
          <q-card-actions horizontal align="center">
            <q-input v-model="inputDateRagenText" >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="dateRange" range>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Sluiten" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div>From: {{fromDate}} / To: {{toDate}}</div>
    {{model}}
  </q-page>
</template>
