<template>
  <q-input v-model="inputValue" @update:model-value="onChangeHandler"/>
</template>

<script setup lang="ts">
import {ref, defineEmits, useAttrs} from 'vue';

const attrs = useAttrs()

const emit = defineEmits(['update:modelValue']);
const inputValue = ref(attrs.value);

function onChangeHandler(event: never) {
  emit('update:modelValue', event);
}
</script>
