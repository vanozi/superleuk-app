<script setup lang="ts">
import {IMonthTotals} from 'stores/workinghours-store';
import {computed} from "vue";

const props = defineProps<{
  year: number;
  isMilker: boolean;
  yearTotals: IMonthTotals[];
}>();

const emit = defineEmits(['changeYearBack', 'changeYearForward'])

function changeYearBack() {
  emit('changeYearBack')
}

function changeYearForward() {
  emit('changeYearForward')
}

const totalHours = computed(() => {
  return props.yearTotals.reduce((acc, cur) => acc + cur.hours, 0)
})

const totalMilkings = computed(() => {
  return props.yearTotals.reduce((acc, cur) => acc + cur.milkings, 0)
})

// table
const columns = computed(() => {
  let baseColumns = [
    {
      name: 'month',
      label: 'Maand',
      align: 'left',
      field: 'month',
      sortable: true
    },
    {
      name: 'hours',
      label: 'Uren',
      align: 'right',
      field: 'hours',
      sortable: true
    },

  ]
  if (props.isMilker) {
    baseColumns.push({
      name: 'milking',
      label: 'Melkbeurten',
      align: 'right',
      field: 'milkings',
      sortable: true
    })
    return baseColumns;
  } else {
    return baseColumns
  }
})


</script>

<template>
  <!--  jaar selecteren -->
  <!--  met de pijltjes emit je een event naar de YearListContainer om het jaar te veranderen en nieuwe data op te halen-->
  <div class="row justify-center items-center">
    <q-btn flat text-color="primary" round size="md" icon="chevron_left" @click="changeYearBack"/>
    <div class="text-h7">{{ year }}</div>
    <q-btn flat text-color="primary" round size="md" icon="chevron_right" @click="changeYearForward"/>
  </div>
  <!--  overzicht uren en melkbeurten -->
  <div class="row justify-center items-center">
    <q-table class="col-12" dense flat hide-bottom :rows="props.yearTotals" :columns="columns"
             :rows-per-page-options="[0]">
      <template v-slot:bottom-row>
        <q-tr>
          <q-td colspan="100%">
            <q-list>
              <q-item>
                <q-item-section/>
                <q-item-section side>
                  <q-item-label overline class="text-weight-bolder">TOTAAL</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section/>
                <q-item-section side>
                  <q-item-label overline>Uren</q-item-label>
                  <q-item-label>{{ totalHours }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="isMilker">
                <q-item-section/>
                <q-item-section side>
                  <q-item-label overline>Melkbeurten</q-item-label>
                  <q-item-label>{{ totalMilkings }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
