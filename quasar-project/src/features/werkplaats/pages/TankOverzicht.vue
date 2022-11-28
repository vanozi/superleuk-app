<template>

<AgGridVue
    style="width: 100%; height: 600px;"
    class="ag-theme-alpine"
    :column-defs="columnDefs"
    :row-data="tankGegevens"
    :default-col-def="defaultColDef"
    animate-rows="true"
    :sorting-order="sortingOrder"
  />
  </template>



<script setup>
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { AgGridVue } from 'ag-grid-vue3'
import { storeToRefs } from 'pinia';
import { useTankGegevens } from 'src/stores/tankgegevens-store';
import { reactive } from 'vue';


const { tankGegevens, loading, error } = storeToRefs(useTankGegevens())
const { fetchTankgegevens } = useTankGegevens()

fetchTankgegevens();

const columnDefs = reactive([
  { headerName: 'Getank op', field: 'start_date_time' },
  { headerName: 'Machine', field: 'vehicle' },
  { headerName: 'Chauffeur', field: 'driver' },
  { headerName: 'Aantal liter', field: 'quantity' },
  { headerName: 'Uren/kilometer stand', field: 'meter' },

])

const defaultColDef = {
  resizable: true,
  sortable: true,
  filter: true,
  cellStyle: { textAlign: 'right' },
  floatingFilter: true,
}



</script>
