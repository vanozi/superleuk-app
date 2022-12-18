<script setup>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridVue } from "ag-grid-vue3";
import { storeToRefs } from "pinia";
import { useTankGegevens } from "src/stores/tankgegevens-store";
import { reactive } from "vue";
import { dateTimeFormatter, meterFormatter } from "src/utils/table_formatters";

const { tankGegevens, loading, error } = storeToRefs(useTankGegevens());
const { fetchTankgegevens } = useTankGegevens();

fetchTankgegevens();

const columnDefs = reactive([
  {
    headerName: "Getank op",
    field: "start_date_time",
    filter: "agDateColumnFilter",
    valueFormatter: dateTimeFormatter,
    filterParams: {
      // provide comparator function
      comparator: (filterTankDate, cellValue) => {
        const dateAsString = cellValue;

        if (dateAsString == null) {
          return 0;
        }

        // In the example application, dates are stored as dd/mm/yyyy
        // We create a Date object for comparison against the filter date
        const datePart = dateAsString.split("T")[0];
        const dateParts = datePart.split("-");
        const year = Number(dateParts[0]);
        const month = Number(dateParts[1]) - 1;
        const day = Number(dateParts[2]);
        const cellDate = new Date(year, month, day);

        // Now that both parameters are Date objects, we can compare
        if (cellDate < filterTankDate) {
          return -1;
        } else if (cellDate > filterTankDate) {
          return 1;
        }
        return 0;
      },
    },
  },
  { headerName: "Machine", field: "vehicle" },
  { headerName: "Chauffeur", field: "driver" },
  { headerName: "Aantal liter", field: "quantity" },
  {
    headerName: "Uren/kilometer stand",
    field: "meter",
    valueFormatter: meterFormatter,
  },
]);

const defaultColDef = {
  resizable: true,
  sortable: true,
  filter: true,
  cellStyle: { textAlign: "left" },
  // floatingFilter: true,
};

// const onGridReady = (params) => {
//   console.log(params);
//   params.api.sizeColumnsToFit();
// };
const onGridReady = (params) => {
      const allColumnIds = [];
      params.columnApi.getAllColumns().forEach((column) => {
        allColumnIds.push(column.getId());
      });
      params.columnApi.autoSizeColumns(allColumnIds, false);
    }
</script>

<template>
  <div class="row justify-center q-gutter-x-md">
    <h6 class="col text-center">Tankoverzicht</h6>
  </div>
  <AgGridVue
  v-if="!loading"
    style="width: 100%; height: 600px"
    class="ag-theme-material q-ma-md"
    :column-defs="columnDefs"
    :row-data="tankGegevens"
    :default-col-def="defaultColDef"
    animate-rows="true"
    :sorting-order="sortingOrder"
    :pagination="true"
    @grid-ready="onGridReady"
  />
</template>
