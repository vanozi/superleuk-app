<script setup lang="ts">

import { PropType, ref } from "vue";
import { IMedewerker, IRole } from "stores/admin/medewerkers-store";

const props = defineProps({
  users: {
    type: Array as PropType<IMedewerker[]>,
    required: true
  },

})

const emits = defineEmits(['navigate-to-user'])

const filter = ref<string>('')

const columns = [{
  name: 'name', label: 'Naam', field: function (row: IMedewerker) {
    return row.first_name + ' ' + row.last_name;
  }, sortable: true, align: 'left'
},
{ name: 'email', label: 'Email', field: 'email', sortable: true, align: 'left' }]

const initialPagination = {
  sortBy: 'desc',
  rowsPerPage: 25
}

function onRowClick(e: PointerEvent, row: IMedewerker) {
  emits('navigate-to-user', row.id)
}

</script>

<template>
  <q-table :rows="props.users" :columns="columns" :filter="filter" row-key="name" flat :pagination="initialPagination"
    @row-click="onRowClick">
    <template v-slot:top-right>
      <q-input dense debounce="300" v-model="filter" placeholder="Zoeken">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>
