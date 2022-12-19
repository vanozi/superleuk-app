<script setup>
//vue
import { reactive } from 'vue';
// ag grid
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { AgGridVue } from 'ag-grid-vue3'

// vue router
import { useRouter } from "vue-router";
import { storeToRefs } from 'pinia'
import { useMachineStore } from 'src/stores/machine-store';

const { machines } = storeToRefs(useMachineStore())

// define router
const router = useRouter();

// ag grid vue variables
// column definitions
const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    cellStyle: { textAlign: 'left' }
}

const columnDefs = reactive([
    { headerName: 'Werknummer / naam', valueGetter: params => { return params.data.work_number + ' - ' + params.data.work_name } },
    { headerName: 'Merk', field: 'brand_name' },
    { headerName: 'Model', field: 'type_name' },
    { headerName: 'Groep', field: 'group' },
    { headerName: 'Categorie', field: 'category' },
    { headerName: 'Kenteken', field: 'licence_number' },
])

// grid events
const onGridReady = (params) => {
  const allColumnIds = [];
  params.columnApi.getColumns().forEach((column) => {
    allColumnIds.push(column.getId());
  });
  params.columnApi.autoSizeColumns(allColumnIds, false);
}

const navigateToMachine = (event) => {
  router.push(`/werkplaats/machine/${event.data.id}`);
}
</script>

<template>
    <AgGridVue style="width: 99%; height: 600px;" class="ag-theme-material q-ma-md"
      :column-defs="columnDefs" :row-data="machines" :default-col-def="defaultColDef" animate-rows="true"
      :pagination="true" @row-double-clicked="navigateToMachine" @grid-ready="onGridReady" />
</template>