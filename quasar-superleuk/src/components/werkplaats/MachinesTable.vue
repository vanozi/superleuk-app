<script setup lang="ts">
// imports for ag-grid-vue3
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridVue } from 'ag-grid-vue3';

// vue imports
import { inject, reactive } from 'vue';

// grid events
const onGridReady = (params: any) => {
  params.api.sizeColumnsToFit();
  window.addEventListener('resize', function () {
    setTimeout(function () {
      params.api.sizeColumnsToFit();
    });
  });
  params.api.sizeColumnsToFit();
};

// column definitions
const columnDefs = reactive([
  {
    headerName: 'Werknummer / naam',
    valueGetter: (params: any) => {
      return params.data.work_number + ' - ' + params.data.work_name;
    },
    filter: true,
    floatingFilter: true,
    resizable: true
  },
  { headerName: 'Merk', field: 'brand_name', resizable: true },
  { headerName: 'Model', field: 'type_name', resizable: true },
  { headerName: 'Groep', field: 'group', resizable: true },
  { headerName: 'Categorie', field: 'category', resizable: true },
  {
    headerName: 'Kenteken',
    field: 'licence_number',
    filter: true,
    floatingFilter: true,
  },
]);

// rows
const rows = inject('rows');
</script>

<template>
  <AgGridVue style="width: 100%; height: 100%" class="ag-theme-material q-ma-md" :column-defs="columnDefs"
    :row-data="rows" animate-rows="true" :pagination="true" paginationPageSize="20" domLayout="autoHeight"
    @grid-ready="onGridReady" />
</template>
