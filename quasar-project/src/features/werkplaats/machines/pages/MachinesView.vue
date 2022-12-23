<script setup>
// pinia / stores
import { storeToRefs } from 'pinia'
import { useMachineStore } from 'src/stores/machine-store';

// components 
import MachinesTable from '../components/tables/MachinesTable.vue'
const { loading, error } = storeToRefs(useMachineStore())
const { fetchMachines } = useMachineStore()

fetchMachines()

</script>

<template>
  <main>
    <div class="row justify-center q-gutter-x-md ">
      <h6 class="col text-center">Machinelijst</h6>
    </div>
    <div class="row justify-center q-gutter-x-md ">
      <p v-if="loading">Machines worden opgehaald...</p>
      <p v-if="error">{{ error.message }}</p>
    </div> 
    <div v-if="!loading">
      <MachinesTable />
    </div>
  </main>
</template>
