<script setup lang="ts">

// imports for stores
import { useMachinesStore } from 'stores/machines-store';
import { onBeforeMount, ref, watch, unref, provide } from 'vue';
// import components
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
      <div style="overflow: hidden; flex-grow: 1">
        <MachinesTableQuasar @filter-data="setFilter" :class="$q.screen.gt.xs ? 'q-px-sm' : ''" />
      </div>
    </div>
  </div>
</template>
