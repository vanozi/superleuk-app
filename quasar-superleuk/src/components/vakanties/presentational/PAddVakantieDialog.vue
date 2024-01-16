<script setup lang="ts">
import { ref, inject } from 'vue';
import AppDateRange from 'src/components/app/AppDateRange.vue';
import AppButton from 'src/components/app/AppButton.vue';
import { useVakantiesStore } from 'src/stores/vakanties-store';

const showAddVakantieDialog: Ref<boolean> = inject('showAddVakantieDialog')!;
const vakantieDates = ref()
const vakantieStore = useVakantiesStore();

function onDateRangeChange(value: any) {
  console.log(value)
  vakantieDates.value = value
}

async function addVakantie() {
  await vakantieStore.addVakantie(vakantieDates.value.from.replace(/\//g, '-'), vakantieDates.value.to.replace(/\//g, '-'))
  // refetch vakanties
  useVakantiesStore().fetchVakantiesForLoggedInUser()
  useVakantiesStore().fetchVakanties()
  showAddVakantieDialog.value = false
}

</script>
<template>
  <q-dialog v-model="showAddVakantieDialog">
    <q-card style="width: 500px">
      <q-toolbar class="bg-secondary text-white">
        <q-btn flat round dense icon="add" />
        <q-toolbar-title :style="$q.screen.lt.md ? { 'font-size': '18px' } : {}">
          Vakantie toevoegen
        </q-toolbar-title>

        <q-btn flat round dense icon="close" @click="showAddVakantieDialog = false" />
      </q-toolbar>
      <q-card-section>
        <AppDateRange @dates-selected-changed="onDateRangeChange" />
      </q-card-section>
      <q-card-actions vertical align="center">
        <app-button label="Toevoegen" outline @click="addVakantie" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
