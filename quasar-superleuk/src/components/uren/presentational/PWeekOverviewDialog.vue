<script setup lang="ts">
import { ColHTMLAttributes, computed, inject, ref, watch } from 'vue';
import { IWorkingHours } from 'src/stores/workinghours-store';
import { formatWeekDate, getDayName } from 'src/utils/date-functions.ts';
import { useMedewerkersStore } from "stores/admin/medewerkers-store";
import AppButton from 'components/app/AppButton.vue';
import AppConfirmDialog from 'src/components/app/AppConfirmDialog.vue';
import { useAdminWorkingHours } from 'src/stores/admin/workinghours-store';
const props = defineProps<{
  weekOverview: [];
  open: boolean;
}>();
const emit = defineEmits(['closeDialog'])
const showDialog = ref(props.open)
const showReleaseConfirmDialog = ref(false)
const medewerkersStore = useMedewerkersStore();
const adminWorkingHoursStore = useAdminWorkingHours()


const releaseWorkingHours = async () => {
  await adminWorkingHoursStore.releaseWorkingHours(props.weekOverview.week_start, props.weekOverview.week_end, medewerkersStore.medewerker.id)
  showReleaseConfirmDialog.value = false
  emit('closeDialog')
}

watch(() => props.open, (value) => {
  console.log(value)
  showDialog.value = value
})
const columns = [
  {
    name: 'day',
    label: 'Dag',
    align: 'left',
    field: row => row.date,
    format: val => `${getDayName(val)}`,
  },
  { name: 'hours', align: 'right', label: 'Uren', field: 'hours', sortable: true },]

const columns_milker = [
  {
    name: 'melkbeurten',
    label: 'Melkbeurten',
    align: 'right',
    field: 'milkings',
  },]
const pagination = {
  sortBy: 'day',
  descending: false,
  rowsPerPage: [0]
}

const isMilker = medewerkersStore.hasUserRole('melker')

</script>

<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="width: 500px">
      <q-toolbar class="bg-secondary text-white">
        <q-btn flat round dense icon="list" />
        <q-toolbar-title>
          Week {{ weekOverview.week }}
        </q-toolbar-title>


        <q-btn flat round dense icon="close" @click="$emit('closeDialog')" />
      </q-toolbar>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1 q-pt-sm">
          {{ formatWeekDate(weekOverview.week_start) }} /
          {{ formatWeekDate(weekOverview.week_end) }}
        </div>
        <q-table flat :rows="weekOverview.working_hours" :columns="isMilker ? columns.concat(columns_milker) : columns"
          row-key="name" hide-bottom :pagination="pagination" />
      </q-card-section>
      <q-card-actions v-if="weekOverview.submitted">
        <div class="text-subtitle2 q-ml-md">Uren zijn ingediend, wil je deze vrijgeven?</div>
        <q-space />
        <app-button outline label="Vrijgeven" color="primary" @click="showReleaseConfirmDialog = true" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <AppConfirmDialog ref="releadeWorkingHoursConfimdialog" v-model="showReleaseConfirmDialog"
    @confirm="releaseWorkingHours">
    <q-toolbar class="bg-secondary text-white">
      <q-btn flat round dense icon="check" />
      <q-toolbar-title :style="$q.screen.lt.md ? { 'font-size': '18px' } : {}">
        Week vrijgeven
      </q-toolbar-title>

      <q-btn flat round dense icon="close" @click="showReleaseConfirmDialog = false" />
    </q-toolbar>
    <q-card-section>
      Wil je de uren voor week {{ weekOverview.week }} vrijgeven?
    </q-card-section>
  </AppConfirmDialog>
</template>
