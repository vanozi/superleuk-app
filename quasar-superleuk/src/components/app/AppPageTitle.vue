<script setup lang="ts">
import { useQuasar } from 'quasar'
const $q = useQuasar()

const props = defineProps<{
  title: string
}>();




</script>
<template>
  <div class="row justify-center">
    <div :class="[$q.screen.lt.md ? 'col-11' : 'col-8']">
      <div class="text-subtitle1">{{ props.title }}</div>
    </div>
  </div>
</template>
