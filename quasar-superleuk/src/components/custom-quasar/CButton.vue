<template>
  <q-btn
    outline
    @click="onClickHandler()"
  />
</template>

<script setup lang="ts">
import {useAttrs} from 'vue';

useAttrs()
const props = defineProps<{
  clickEvent: string;
}>();


const emit = defineEmits(['clickButton']);

function onClickHandler() {
  emit('clickButton', props.clickEvent);
}
</script>

<style scoped></style>
