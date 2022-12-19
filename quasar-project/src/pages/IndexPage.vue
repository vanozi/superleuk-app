<script>
export default {
  name: "IndexPage",
};
</script>

<script setup>
import ExampleChart from "src/components/charts/tankChart.vue";
import { ref, computed, watch } from "vue";
import { date } from "quasar";
import { useTankGegevens } from "src/stores/tankgegevens-store";

const { fetchSummedDataBetweenDates } = useTankGegevens();

const toDate = ref(new Date());
const fromDate = ref(
  date.subtractFromDate(toDate.value, { months: 1 })
);

const fromDateGraph = computed({
  // getter
  get() {
    return ref(date.formatDate(fromDate.value, 'YYYY/MM/DD'))
  },
  // setter
  set(newDate) {
    fromDate.value = newDate.from;
  },
});

const toDateGraph = computed({
  // getter
  get() {
    return ref(date.formatDate(toDate.value, 'YYYY/MM/DD'))
  },
  // setter
  set(newDate) {
    toDate.value = newDate.value;
  },
});

const dateRange = ref({ from: fromDateGraph.value.value, to: toDateGraph.value.value });

const inputDateRangeText = computed(() => {
  return `${dateRange.value.from} - ${dateRange.value.to}`;
});

watch(dateRange, async (newRange, oldRange) => {
  console.log('newRange', newRange.from)
  const from = new Date(newRange.from.split('/')[0], newRange.from.split('/')[1], newRange.from.split('/')[2])
  const to = new Date(newRange.to.split('/')[0], newRange.to.split('/')[1], newRange.to.split('/')[2])
  fetchSummedDataBetweenDates(date.formatDate(from, 'YYYY-MM-DD'), date.formatDate(to, 'YYYY-MM-DD'))

})


const optionsFn = (datum) => { return datum <= date.formatDate(new Date(), 'YYYY/MM/DD') }

fetchSummedDataBetweenDates();

</script>

<template>
  <q-page>
    <div class="fit row wrap justify-center items-start q-ma-md">
      <div class="col-6 self-center">
        <q-card class="q-ma-md">
          <q-card-section>
            <div class="text-h6">Tankdata</div>
            <div class="text-subtitle2">
              Totaal aantal liters per dag (uitgezonderd klein materiaal)
            </div>
          </q-card-section>
          <q-card-section>
            <ExampleChart />
          </q-card-section>
          <q-card-actions horizontal align="center">
            <q-input v-model="inputDateRangeText" style="width: 200px">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="dateRange" range :options="optionsFn">
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
  </q-page>
</template>
