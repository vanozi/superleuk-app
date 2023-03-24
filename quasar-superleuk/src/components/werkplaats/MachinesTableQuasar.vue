<script setup lang="ts">
import { reactive, inject, ref } from 'vue';
import MachineFilters from './MachineFilters.vue';

// column definitions
const columnDefs: any = reactive([
  {
    name: 'name',
    field: (row: { work_number: string; work_name: string }) =>
      row.work_number + ' - ' + row.work_name,
    label: 'Werknaam',
    align: 'left',
  },
  { name: 'brand_name', field: 'brand_name', label: 'Merk', align: 'left' },
  { name: 'model', field: 'type_name', align: 'left', label: 'Model' },
  { name: 'group', field: 'group', align: 'left', label: 'Groep' },
  { name: 'category', field: 'category', align: 'left', label: 'Categorie' },
  {
    name: 'licence_number',
    field: 'licence_number',
    align: 'left',
    label: 'Kenteken',
  },
]);

const visibleColumns = ref([
  'name',
  'brand_name',
  'model',
  'group',
  'category',
  'licence_number',
]);

const initialPagination = {
  sortBy: 'name',
  descending: false,
  page: 1,
  rowsPerPage: 25,
  // rowsNumber: xx if getting data from a server
};

const filter = ref('');

// rows
const rows: any = inject('rows');

// table functions
const rowDoubleClick = function (e: Event, row: any) {
  console.log(e);
  console.log(row);
};
</script>

<template>
  <q-table
    :grid="$q.screen.xs"
    :rows="rows"
    :columns="columnDefs"
    row-key="name"
    :pagination="initialPagination"
    :filter="filter"
    :card-class="$q.screen.xs ? 'grid-card' : ''"
    :visible-columns="visibleColumns"
    @row-dblclick="rowDoubleClick"
  >
    <template v-slot:top>
      <q-card flat class="header-card">
        <q-card-section>
          <div class="text-h6">Machinelijst</div>
        </q-card-section>
        <q-card-section>
          <MachineFilters @filter-data="$emit('filter-data', $event)" />
        </q-card-section>
        <q-card-section>
          <q-input
            dense
            debounce="300"
            color="primary"
            v-model="filter"
            style="width: 350px"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-card-section>
      </q-card>

      <!-- <q-list style="width: 100%">
        <q-item style="justify-content: start">
          <p class="text-h5">Machinelijst</p>
        </q-item>

        <q-item>
          <MachineFilters @filter-data="$emit('filter-data', $event)" />
        </q-item>
        <q-item style="justify-content: start">
          <q-select
            v-model="visibleColumns"
            multiple
            outlined
            dense
            options-dense
            :display-value="$q.lang.table.columns"
            emit-value
            map-options
            :options="columnDefs"
            option-value="name"
            options-cover
            style="min-width: 150px"
            class="q-pa-xs"
          />
        </q-item>
        <q-item style="justify-content: start">
          <q-input
            dense
            debounce="300"
            color="primary"
            v-model="filter"
            style="width: 350px"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-item>
      </q-list> -->
    </template>
  </q-table>
</template>

<style>
.grid-card {
  border: solid;
  border-color: grey;
}
.header-card {
  width: 100%;
}
</style>
