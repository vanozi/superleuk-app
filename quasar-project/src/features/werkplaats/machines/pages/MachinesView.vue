<script setup>
// vue
import { reactive } from 'vue';
// ag grid
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { AgGridVue } from 'ag-grid-vue3'
// stores
import { storeToRefs } from 'pinia'
import {useMachineStore} from 'src/stores/machine-store';
// formatters
import {machineNameFormatter, brandModelNameFormatter} from 'src/utils/table_formatters'
// cellRenderers
import  MachineLinkCellRenderer from '../components/MachineLinkCellRenderer.vue'

const { machines, loading, error } = storeToRefs(useMachineStore())
const { fetchMachines } = useMachineStore()


fetchMachines()





// AG Grid Machine tabel
const defaultColDef = {
  resizable: true,
  sortable: true,
  filter: true,
  cellStyle: { textAlign: 'left' },
  // floatingFilter: true,
}

const columnDefs = reactive([
  { headerName: 'Werknummer / naam', field: 'work_name', cellRenderer:MachineLinkCellRenderer
  // valueFormatter : machineNameFormatter
},
  { headerName: 'Merk', field: 'brand_name' },
  { headerName: 'Model', field: 'type_name' },
  { headerName: 'Groep', field: 'group'},
  { headerName: 'Categorie', field: 'category' },
  { headerName: 'Kenteken', field: 'licence_number' },

])

</script>

<template>
  <main>
    <div class="row justify-center q-gutter-x-md ">
      <h6 class="col text-center">Machinelijst</h6>
    </div>
    <p v-if="loading">Loading posts...</p>
    <p v-if="error">{{ error.message }}</p>
    <AgGridVue
    style="width: 100%; height: 600px;"
    class="ag-theme-material q-ma-md"
    :column-defs="columnDefs"
    :row-data="machines"
    :default-col-def="defaultColDef"
    animate-rows="true"
    :sorting-order="sortingOrder"
    :pagination="true"
    @row-double-clicked="navigateToMachine"
  />
    <!-- <div v-if="machines">
      <div v-for="machine in machines" :key="machine.id">
        <RouterLink :to="`/werkplaats/machine/${machine.work_name}`">{{ machine.work_name }}</RouterLink>
        <p>{{machine.work_name}}</p>
      </div>
    </div> -->
  </main>
</template>
