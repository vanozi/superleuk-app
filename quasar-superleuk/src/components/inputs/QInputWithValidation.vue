
<template>
  <q-input outlined square v-model="value" :error-message="errorMessage" :error="!!errorMessage"
    data-test="email-input" />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps<{
  name: string
}>()

const { errorMessage, value } = useField(props.name);

</script>
