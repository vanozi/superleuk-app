<template>
  <q-btn
    :name="props.name"
    :label="props.label"
    @click="onClickHandler"
    :data-testId="props.testId"
  />
</template>

<script setup lang="ts">
import { QInputProps } from 'quasar';
import { ref } from 'vue';
const props = defineProps<{
  name: string;
  label: string;
  testId?: string;
}>();

const emit = defineEmits(['clickButton']);

function onClickHandler(event: any) {
  emit('clickButton', event);
}
</script>

<style scoped></style>
