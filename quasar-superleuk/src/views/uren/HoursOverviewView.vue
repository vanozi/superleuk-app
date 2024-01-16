<script setup lang="ts">
import { ref } from 'vue';
import SingleRow from 'components/app/content-layout/SingleRow.vue';
import YearListContainer from "src/components/uren/container/YearListContainer.vue";
import WeekListContainer from "components/uren/container/WeekListContainer.vue";

const tab = ref('week')

</script>
<template>
  <div>
    <q-tabs v-model="tab" dense>
      <q-tab name="week" label="Week">
      </q-tab>
      <q-tab name="maand" label="Maand" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="week">
        <SingleRow>
          <WeekListContainer />
        </SingleRow>
      </q-tab-panel>
      <q-tab-panel name="maand">
        <SingleRow>
          <year-list-container />
        </SingleRow>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
