<script setup lang="ts">

import {PropType} from "vue";
import {IMedewerker, IRole} from "stores/admin/medewerkers-store";

const props = defineProps({
  users: {
    type: Array as PropType<IMedewerker[]>,
    required: true
  },

})

const emits = defineEmits(['navigate-to-user-profile'])

const columns = [{
  name: 'name', label: 'Naam', field: function (row: IMedewerker) {
    return row.first_name + ' ' + row.last_name;
  }, sortable: true, align: 'left'
},
  {name: 'email', label: 'Email', field: 'email', sortable: true, align: 'left'}]

const initialPagination = {
  sortBy: 'desc',
  rowsPerPage: 25
}

function onRowClick(e: PointerEvent, row: IMedewerker) {
  emits('navigate-to-user-profile', row.id)
}

</script>

<template>
  <q-table
      :rows="props.users"
      :columns="columns"
      row-key="name"
      flat
      :pagination="initialPagination"
      @row-click="onRowClick"
  />
</template>
