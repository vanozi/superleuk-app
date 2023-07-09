<script setup lang="ts">
import { ref } from 'vue';

const showDialog = ref(false);
</script>
<template>
  <q-page>
    <q-btn label="Alert" color="primary" @click="showDialog = true" />
    <q-dialog v-model="showDialog">
      <q-card>

      </q-card>
    </q-dialog>
  </q-page>
</template>
