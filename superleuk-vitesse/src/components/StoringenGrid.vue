<script setup>
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue3'
import { storeToRefs } from 'pinia'
import stroingenJson from '../data/storingen.json'

const columnDefs = reactive([
  { headerName: 'Datum', field: 'created_at', sortingOrder: ['desc', 'asc'], width: '200px', valueFormatter: dateFormatter },
  { headerName: 'Machine', field: 'machine.work_name', width: '200px' },
  { headerName: 'Omschrijving', field: 'issue_description', flex: 1, cellStyle: { textAlign: 'left' } },
])
const rowData = reactive({
  value: [{ make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }],
})
const defaultColDef = {
  resizable: true,
  sortable: true,
  filter: true,
  cellStyle: { textAlign: 'right' },
  floatingFilter: true,
}
function dateFormatter(date) {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  console.log(date)
  const dateObject = new Date(date.value)
  return dateObject.toLocaleDateString('nl', 'NL')
}

onMounted(() => {
  rowData.value = stroingenJson
  // fetch('./storingen.json').then(result => result.json()).then(remoteRowData => (rowData.value = remoteRowData))
})
</script>

<template>
  <AgGridVue
    style="width: 100%; height: 600px;"
    class="ag-theme-alpine"
    :column-defs="columnDefs"
    :row-data="rowData.value"
    :default-col-def="defaultColDef"
    animate-rows="true"
    :sorting-order="sortingOrder"
  />
</template>
