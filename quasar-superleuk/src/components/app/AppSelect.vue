<script setup lang="ts">

import {onBeforeMount, onMounted, ref, useAttrs} from "vue";

const props = defineProps(['options', 'name', 'label', 'testId'])
const attrs = useAttrs();


const emit = defineEmits(['update:modelValue']);
const selectedValue = ref()
onBeforeMount(() => {
  if (attrs.value) {
    selectedValue.value = attrs.value
  }
  else {
    selectedValue.value = props.options[0]
  }
})

function onChangeHandler() {
  emit('update:modelValue', selectedValue.value);
}

</script>

<template>
  <q-select
      :name="props.name"
      :data-testId="props.testId"
      :options="props.options"
      :label="props.label"
      v-model="selectedValue"
      @update:model-value="onChangeHandler"
      options-dense
  />
</template>
