<script setup>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridVue } from "ag-grid-vue3";
import { storeToRefs } from "pinia";
import { useStoringenStore } from "src/stores/storingen-store";
import { reactive } from 'vue'
import MachineLinkCellRenderer from '../../machines/components/MachineLinkForStoringenViewCellRenderer .vue'
import { useRouter } from "vue-router";

const router = useRouter();

const { storingen, loading, error, getNotClosedStoringen } = storeToRefs(useStoringenStore());
const { fetchAllStoringen } = useStoringenStore();

fetchAllStoringen();

const columnDefs = reactive([
  { headerName: "Datum", valueGetter: params => { return params.data.created_at.split('T')[0] } },
  { headerName: "Status", field: "status" },
  { headerName: "Melder", valueGetter: params => { return params.data.user.first_name + ' ' + params.data.user.last_name } },
  { headerName: "Machine", field: "machine.work_name", cellRenderer: MachineLinkCellRenderer },
  { headerName: "Omschrijving", field: "issue_description" },
]);

const defaultColDef = {
  resizable: true,
  sortable: true,
  filter: true,
  cellStyle: { textAlign: "left" },
  floatingFilter: true
};

const onGridReady = (params) => {
  const allColumnIds = [];
  params.columnApi.getColumns().forEach((column) => {
    allColumnIds.push(column.getId());
  });
  params.columnApi.autoSizeColumns(allColumnIds, true);
}
// params.api.sizeColumnsToFit();

const navigateToStoring = (event) => {
  router.push(`/werkplaats/storing/${event.data.id}`);
}



</script>

<template>
  <div class="row justify-center q-gutter-x-md">
    <h6 class="col text-center">Storingen</h6>
  </div>
  <div class="row justify-center">
    <div class="col-12 col-xl-8">
      <div style=" overflow: hidden; flex-grow: 1;">
        <AgGridVue v-if="!loading" style="width: 100%; height: 100%" class="ag-theme-material q-ma-md"
          :column-defs="columnDefs" :row-data="getNotClosedStoringen" :default-col-def="defaultColDef"
          animate-rows="true" :pagination="true" paginationPageSize="20" domLayout="autoHeight" @grid-ready="onGridReady" @row-double-clicked="navigateToStoring" />
      </div>
    </div>
  </div>

</template>
