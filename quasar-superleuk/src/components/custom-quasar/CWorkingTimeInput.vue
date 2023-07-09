<template>
  <div class="fit row wrap justify-start items-start content-start">
  <q-select class="col-6 q-pr-sm"
    :name="props.name"
    v-model="inputValueHours"
    label="Uren"
    @update:model-value="onChangeHandler"
    :data-testId="props.testId"
    :options="hourOptions"
    options-dense
  />
  <q-select  class="col-6 q-pl-sm"
    :name="props.name"
    v-model="inputValueMinutes"
    label="Minuten"
    @update:model-value="onChangeHandler"
    :data-testId="props.testId"
    :options="minuteOptions"
    options-dense
  />
</div>
</template>

<script setup lang="ts">
import { QSelectProps } from 'quasar';
import { ref, computed } from 'vue';
const props = defineProps<{
  name: string;
  testId?: string;
  value?:number;
}>();

const inputValueHours = ref(props.value == undefined ? 0 :  convertFloatToHoursMinutes(props.value).hours);
const inputValueMinutes = ref(props.value == undefined ? 0 :  convertFloatToHoursMinutes(props.value).minutes);
const minutesAsFloatDecimalPart = computed(() => (inputValueMinutes.value == undefined ? 0 : Number(inputValueMinutes.value) / 60) * 100)
const hourOptions = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24,
];
const minuteOptions = [0,15,30,45]

const workingTimeAsFloat = computed(() => Number(inputValueMinutes.value) > 0 ? `${inputValueHours.value}.${minutesAsFloatDecimalPart.value}` : `${inputValueHours.value}`);

const emit = defineEmits(['update:modelValue']);

function onChangeHandler(event: any) {
  emit('update:modelValue', workingTimeAsFloat.value);
}

function convertFloatToHoursMinutes(floatValue: number): { hours: number; minutes: number } {
  const hours: number = Math.floor(floatValue);
  const minutes: number = Math.round((floatValue - hours) * 60);
  return { hours, minutes };
}
</script>

<style scoped></style>
