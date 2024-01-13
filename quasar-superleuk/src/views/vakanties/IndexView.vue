<script setup lang="ts">
import { ref } from "vue";
import CVakantiesOverzicht from 'src/components/vakanties/containers/CVakantiesOverzicht.vue';

const tab = ref('invoeren')
</script>

<template>
  <q-tabs v-model="tab" dense>
    <q-tab name="invoeren" icon="add">
    </q-tab>
    <q-tab name="overzicht" icon="o_list" />
  </q-tabs>
  <q-separator />
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="invoeren">
      "henk"
    </q-tab-panel>
    <q-tab-panel name="overzicht">
      <CVakantiesOverzicht />
    </q-tab-panel>
  </q-tab-panels>
</template>
