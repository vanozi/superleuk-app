<script setup lang="ts">
// imports for ag-grid-vue3
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridVue } from 'ag-grid-vue3';
// imports for stores
import { useMachinesStore } from 'stores/machines-store';
import { onBeforeMount, reactive, ref, watch, unref, provide } from 'vue';
// import components
import MachineFilters from 'components/werkplaats/MachineFilters.vue';
import MachinesTable from 'src/components/werkplaats/MachinesTable.vue';
import MachinesTableQuasar from 'src/components/werkplaats/MachinesTableQuasar.vue';
// import typescript models
import { IFilterMachine } from 'src/models/typescipt-models';

// define stores
const machineStore = useMachinesStore();

onBeforeMount(() => {
  machineStore.fetchMachines();
});

const filterValue = ref<any>({
  brands: [],
  categories: [],
  groups: [],
  models: [],
});

function setFilter(filter: IFilterMachine) {
  filterValue.value = filter;
}

const rows = ref();
provide(/* key */ 'rows', /* value */ rows);

watch(
  filterValue,
  async (newFilter, oldFilter) => {
    if (oldFilter.value != undefined) {
      let unrefferdNewFilter = unref(newFilter);
      rows.value = machineStore.machines.filter(
        (el) =>
          unrefferdNewFilter.brands.indexOf(el.brand_name) > -1 &&
          unrefferdNewFilter.models.indexOf(el.type_name) > -1 &&
          unrefferdNewFilter.groups.indexOf(el.group) > -1 &&
          unrefferdNewFilter.categories.indexOf(el.category) > -1
      );
    }
  },
  { deep: true }
);
</script>

<template>
  <div>
    <div class="flex row">
      <div class="col-auto">
        <!-- <MachineFilters @filter-data="setFilter" class="q-px-md q-mt-xl" /> -->
      </div>
      <div style="overflow: hidden; flex-grow: 1">
        <!-- <AgGridVue style="width: 100%; height: 100%" class="ag-theme-material q-ma-md" :column-defs="columnDefs"
                    :row-data="rows" animate-rows="true" :pagination="true" paginationPageSize="20" domLayout="autoHeight"
                    @grid-ready="onGridReady" /> -->
        <!-- <MachinesTable /> -->
        <MachinesTableQuasar
          @filter-data="setFilter"
          :class="$q.screen.gt.xs ? 'q-px-sm' : ''"
        />
      </div>
    </div>
  </div>
</template>
