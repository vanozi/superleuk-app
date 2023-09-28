<template>
      <q-tabs
        v-model="tab"
        dense
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <q-tab name="index" icon="o_dashboard" />
        <q-tab name="invoeren" icon="add" />
        <q-tab name="overzicht" icon="o_list" />
      </q-tabs>
</template>

<script setup lang="ts">
import {ref} from "vue";

const tab = ref('index')
</script>
