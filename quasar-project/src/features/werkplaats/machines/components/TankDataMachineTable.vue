<script setup>
import { reactive, inject } from 'vue'
// imports voor de grid
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { AgGridVue } from 'ag-grid-vue3'
import { dateTimeFormatter, meterFormatter } from 'src/utils/table_formatters'

// props
const machine =  inject('machine');

// column definitions
const columnDefs = reactive([
  {
    headerName: 'Getank op', field: 'start_date_time', filter: 'agDateColumnFilter', sort: 'desc', valueFormatter: dateTimeFormatter,
    filterParams: {
      // provide comparator function
      comparator: (filterTankDate, cellValue) => {
        const dateAsString = cellValue;

        if (dateAsString == null) {
          return 0;
        }

        // In the example application, dates are stored as dd/mm/yyyy
        // We create a Date object for comparison against the filter date
        const datePart = dateAsString.split('T')[0];
        const dateParts = datePart.split('-');
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
      }
    }
  },
  { headerName: 'Chauffeur', field: 'driver' },
  { headerName: 'Aantal liter', field: 'quantity' },
  { headerName: 'Uren/kilometer stand', field: 'meter', valueFormatter: meterFormatter },

])

const defaultColDef = {
  resizable: true,
  sortable: true,
  filter: true,
  cellStyle: { textAlign: 'right' },
  // floatingFilter: true,
}
</script>

<template>
  <AgGridVue style="height: 600px;" class="ag-theme-material" :column-defs="columnDefs"
    :row-data="machine.tank_transactions" :default-col-def="defaultColDef" animate-rows="true" :sorting-order="sortingOrder"
    :pagination="true" />

</template>
