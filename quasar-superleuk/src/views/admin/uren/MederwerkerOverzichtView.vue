<script setup lang="ts">
import { ref } from 'vue';
import YearListContainer from 'components/admin/uren/container/YearListContainer.vue';
import WeekListContainer from 'components/admin/uren/container/WeekListContainer.vue';
import { useMedewerkersStore } from "stores/admin/medewerkers-store";
import SingleRow from 'components/app/content-layout/SingleRow.vue';

import { router } from "src/router";
const user_id: number = parseInt(router.currentRoute.value.params.id as string)
const medewerkersStore = useMedewerkersStore();
const medewerker = medewerkersStore.getUserById(user_id)
const tab = ref('week')
const showDialog = ref(false)

</script>
<template>
  <SingleRow>
    <q-tabs v-model="tab" dense>
      <q-tab name="week" label="Week">
      </q-tab>
      <q-tab name="maand" label="Maand" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="week">
        <WeekListContainer :user_id="user_id" />
      </q-tab-panel>
      <q-tab-panel name="maand">
        <year-list-container :user_id="user_id" />
      </q-tab-panel>
    </q-tab-panels>
  </SingleRow>
  <CWeekOverviewDialog :show-dialog="showDialog" />
</template>
