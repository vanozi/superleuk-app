
<script setup lang="ts">
import { ref } from "vue";
import HourRegistrationView from "src/views/uren/HourRegistrationView.vue";
import HoursOverviewView from "src/views/uren/HoursOverviewView.vue";

const tab = ref('invoeren')
</script>


<template>
  <q-tabs v-model="tab" dense :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
    <q-tab name="invoeren" icon="add">
    </q-tab>
    <q-tab name="overzicht" icon="o_list" />
  </q-tabs>
  <q-separator />
  <q-tab-panels v-model="tab" animated dense>
    <q-tab-panel name="invoeren">
      <HourRegistrationView />
    </q-tab-panel>
    <q-tab-panel name="overzicht">
      <HoursOverviewView />
    </q-tab-panel>
  </q-tab-panels>
</template>
