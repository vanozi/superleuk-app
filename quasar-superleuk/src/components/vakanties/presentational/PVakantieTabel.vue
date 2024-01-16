<script setup lang="ts">
import { ref } from 'vue';
import AppButton from 'src/components/app/AppButton.vue';
import SingleRow from 'src/components/app/content-layout/SingleRow.vue';
import { IVakantie } from 'src/components/models';

// Props and emits
const props = defineProps<{
  vakanties: IVakantie[]
}>();

const emit = defineEmits<{
  (e: 'deleteVakantie', id: number): void
  (e: 'addVakantie', vakantie: IVakantie): void
  (e: 'showAddVakantieDialog', show: boolean): void
}>()

const columns = [
  { name: 'start', label: 'van', field: 'start_date', align: 'left', sortable: true },
  { name: 'end', label: 'tot', field: 'end_date', align: 'left', sortable: true },
  { name: 'actions', label: 'acties', align: 'left', }
]

const initialPagination = {
  descending: false,
  page: 1,
  rowsPerPage: 25,

};

function onDelete(row: any) {
  emit('deleteVakantie', row.id)
}

function addVakantie(vakantie: IVakantie) {
  emit('addVakantie', vakantie)
}

function showAddVakantieDialog() {
  emit('showAddVakantieDialog', true)
}


</script>
<template>
  <single-row>
    <div class="text-subtitle1">Mijn vakanties</div>
  </single-row>
  <single-row>
    <q-table rows-per-page-label="Vakanties per pagina" flat dense :rows="props.vakanties" :columns="columns"
      :pagination="initialPagination" row-key="start">
      <template v-slot:top>
        <app-button outline icon="add" color="primary" label="toevoegen" @click="showAddVakantieDialog" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <app-button flat round icon="o_delete" outline color="negative" @click="onDelete(props.row)" />
        </q-td>
      </template> </q-table>
  </single-row>
</template>
