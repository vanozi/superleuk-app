<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useMachinesStore } from 'stores/machines-store';
import { IFilterMachine } from 'src/types/typescipt-models';

// emits
const emit = defineEmits(['filterData']);

// define stores
const machineStore = useMachinesStore();
const machinesFilter = computed((): IFilterMachine => {
  return {
    brands:
      brands.value == null || brands.value.length == 0
        ? machineStore.getBrands
        : brands.value,
    categories:
      categories.value == null || categories.value.length == 0
        ? machineStore.getCategories
        : categories.value,
    groups:
      groups.value == null || groups.value.length == 0
        ? machineStore.getGroups
        : groups.value,
    models:
      models.value == null || models.value.length == 0
        ? machineStore.getModels
        : models.value,
  };
});

// filters
const brands = ref();
const categories = ref();
const groups = ref();
const models = ref();

function updateFilteredMachines() {
  emit('filterData', machinesFilter);
}

onMounted(() => emit('filterData', machinesFilter));
</script>

<template>
  <div class="fit row justify-start">
    <q-select
      clearable
      v-model="groups"
      multiple
      :options="machineStore.getGroups"
      label="Groepen"
      @update:model-value="(val) => updateFilteredMachines()"
      style="width: 150px"
      options-dense
      dense
      outlined
      class="q-pa-xs"
    />
    <q-select
      clearable
      v-model="categories"
      multiple
      :options="machineStore.getCategories"
      label="Categorien"
      @update:model-value="(val) => updateFilteredMachines()"
      style="width: 150px"
      options-dense
      dense
      outlined
      class="q-pa-xs"
    />
    <q-select
      clearable
      v-model="brands"
      multiple
      :options="machineStore.getBrands"
      label="Merken"
      @update:model-value="(val) => updateFilteredMachines()"
      style="width: 150px"
      options-dense
      dense
      outlined
      class="q-pa-xs"
    />
    <q-select
      clearable
      v-model="models"
      multiple
      :options="machineStore.getModels"
      label="Modellen"
      @update:model-value="(val) => updateFilteredMachines()"
      style="width: 150px"
      options-dense
      dense
      outlined
      class="q-pa-xs"
    />
  </div>
</template>
