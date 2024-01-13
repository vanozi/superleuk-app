<script setup lang="ts">
const props = defineProps({
  data: {
    type: Array as PropType<IVakantie[]>,
    required: true,
  },
})

const columns = [
  { name: 'van', label: 'van', field: 'start_date', sortable: true },
  { name: 'tot', label: 'tot', field: 'end_date', sortable: true },
]

</script>
<template>
  <q-table title="Table Title" :data="props.data" :columns="columns" row-key="name" />
</template>
