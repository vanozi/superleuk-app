<script setup lang="ts">
import { ref } from 'vue';
import YearListContainer from "src/components/uren/container/YearListContainer.vue";
import WeekListContainer from "components/uren/container/WeekListContainer.vue";

const tab = ref('week')

</script>
<template>
  <q-tabs v-model="tab" dense>
    <q-tab name="week" label="Week">
    </q-tab>
    <q-tab name="maand" label="Maand" />
  </q-tabs>
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="week">
      <WeekListContainer />
    </q-tab-panel>
    <q-tab-panel name="maand">
      <year-list-container />
    </q-tab-panel>
  </q-tab-panels>
</template>
