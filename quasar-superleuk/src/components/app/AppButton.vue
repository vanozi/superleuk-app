<script setup lang="ts">
import { useQuasar } from 'quasar'
import { computed } from 'vue';

const $q = useQuasar()
const props = defineProps<{
  color?: string;
  size?: string;
  icon?: string;
  label?: string;
  to?: string;
  disable?: boolean;
  align?: "left" | "right" | "center" | "around" | "between" | "evenly" | undefined;
}>();

const buttonSize = computed(() => {
  return $q.screen.lt.sm
    ? 'sm'
    : 'md'
})
</script>

<template>
  <q-btn unelevated :color="props.color" :icon="props.icon" :label="props.label" :disable="props.disable"
    :size="buttonSize" :align="props.align" />
</template>
