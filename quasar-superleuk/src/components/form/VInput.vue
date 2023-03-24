<template>
  <q-input
    :name="props.name"
    :type="props.type"
    v-model="inputValue"
    :label="props.label"
    @update:model-value="onChangeHandler"
  />
</template>

<script setup lang="ts">
import { QInputProps } from 'quasar';
import { ref } from 'vue';
const props = defineProps<{
  name: string;
  type: QInputProps['type'];
  value: QInputProps['modelValue'];
  label: string;
}>();

const inputValue = ref(props.value);

const emit = defineEmits(['update:modelValue']);

function onChangeHandler(event: any) {
  emit('update:modelValue', event);
}
</script>

<style scoped></style>
