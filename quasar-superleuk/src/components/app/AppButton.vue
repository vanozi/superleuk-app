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
}>();

const buttonSize = computed(() => {
      return $q.screen.lt.sm
        ? 'md'
        : 'md'
    })
</script>

<template>
  <q-btn
    unelevated
    :color="props.color"
    :icon="props.icon"
    :label="props.label"
    :disable="props.disable"
    :size="buttonSize"
  />
</template>
