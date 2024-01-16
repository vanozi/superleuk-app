<script setup lang="ts">
import { useQuasar } from 'quasar'
const $q = useQuasar()
</script>
<template>
  <div class="row justify-center q-mt-md">
    <div :class="[$q.screen.lt.md ? 'col-12' : 'col-8']">
      <slot></slot>
    </div>
  </div>
</template>
