<template>
  <div class="fit row wrap justify-start items-start content-start">
  <q-select class="col-6 q-pr-sm"
    :name="props.name"
    v-model="inputValueHours"
    label="Uren"
    @update:model-value="onChangeHandler"
    :data-testId="props.testId"
    :options="hourOptions"
    style="overflow: auto;"
    options-dense
    behavior="dialog"
  />
  <q-select  class="col-6 q-pl-sm"
    :name="props.name"
    v-model="inputValueMinutes"
    label="Minuten"
    @update:model-value="onChangeHandler"
    :data-testId="props.testId"
    :options="minuteOptions"
    style="overflow: auto;"
    options-dense
    behavior="dialog"
  />
</div>
</template>

<script setup lang="ts">
import { QSelectProps } from 'quasar';
import { ref } from 'vue';
const props = defineProps<{
  name: string;
  testId?: string;
}>();

const inputValueHours = ref(0);
const inputValueMinutes = ref(0);
const hourOptions = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24,
];
const minuteOptions = [0,15,30,45]

const emit = defineEmits(['update:modelValue']);

function onChangeHandler(event: any) {
  emit('update:modelValue', event);
}
</script>

<style scoped></style>
