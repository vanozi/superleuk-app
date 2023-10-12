<script setup lang="ts">
import { computed } from 'vue';
import { IWeekData } from 'components/models';

const props = defineProps<{
  year: number;
  isMilker: boolean;
  weekTotals: IWeekData[];
}>();

const emit = defineEmits(['changeYearBack', 'changeYearForward']);

function changeYearBack() {
  emit('changeYearBack');
}

function changeYearForward() {
  emit('changeYearForward');
}

const totalHours = computed(() => {
  return props.weekTotals.reduce((acc, cur) => acc + cur.sum_hours, 0);
});

const totalMilkings = computed(() => {
  return props.weekTotals.reduce((acc, cur) => acc + cur.sum_milkings, 0);
});

function formatWeekDate(dateString) {
  const options = {
    month: 'short',
    day: 'numeric',
  };
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-NL', options);
}

// table
const columns = computed(() => {
  let baseColumns = [
    {
      name: 'week',
      label: 'Week',
      align: 'left',
      field: 'week',
      sortable: true,
    },
    {
      name: 'range',
      label: 'Van / tot',
      align: 'left',
      sortable: true,
    },
    {
      name: 'hours',
      label: 'Uren',
      align: 'right',
      field: 'sum_hours',
      sortable: true,
    },
  ];
  if (props.isMilker) {
    baseColumns.push({
      name: 'milking',
      label: 'Melkbeurten',
      align: 'right',
      field: 'sum_milkings',
      sortable: true,
    });
    return baseColumns;
  } else {
    return baseColumns;
  }
});
</script>

<template>
  <!--  jaar selecteren -->
  <!--  met de pijltjes emit je een event naar de YearListContainer om het jaar te veranderen en nieuwe data op te halen-->
  <div class="row justify-center items-center">
    <q-btn
      flat
      text-color="primary"
      round
      size="md"
      icon="chevron_left"
      @click="changeYearBack"
    />
    <div class="text-h7">{{ year }}</div>
    <q-btn
      flat
      text-color="primary"
      round
      size="md"
      icon="chevron_right"
      @click="changeYearForward"
    />
  </div>
  <!--  overzicht uren en melkbeurten -->
  <div class="row justify-center items-center">
    <q-table
      class="col-12"
      dense
      flat
      hide-bottom
      :rows="props.weekTotals"
      :columns="columns"
      :rows-per-page-options="[0]"
    >
      <template v-slot:body-cell-range="props">
        <q-td :props="props">
          {{ formatWeekDate(props.row.week_start) }} /
          {{ formatWeekDate(props.row.week_end) }}
        </q-td>
      </template>
      <template v-slot:bottom-row>
        <q-tr>
          <q-td colspan="100%">
            <q-list>
              <q-item>
                <q-item-section />
                <q-item-section side>
                  <q-item-label overline class="text-weight-bolder"
                    >TOTAAL</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section />
                <q-item-section side>
                  <q-item-label overline>Uren</q-item-label>
                  <q-item-label>{{ totalHours }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="isMilker">
                <q-item-section />
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
