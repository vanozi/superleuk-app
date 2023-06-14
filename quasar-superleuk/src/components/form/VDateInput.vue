<template>
  <q-input
    :name="props.name"
    v-model="inputValue"
    :label="props.label"
    @update:model-value="onChangeHandler"
    :data-testId="props.testId"
    readonly
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date name="datepicker" v-model="inputValue" mask="YYYY-MM-DD" minimal :options="formattedDates">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Ok" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon> </template
  ></q-input>
</template>

<script setup lang="ts">
import { QInputProps, QDateProps, QDate } from 'quasar';
import { ref, toRefs, unref, computed, onMounted } from 'vue';

const props = defineProps<{
  name: string;
  type: QInputProps['type'];
  value: QInputProps['modelValue'];
  label: string;
  testId?: string;
  options?: any;
}>();

onMounted(()=>{
  console.log(props)
})

const formattedDates = unref(props.options).slice().map(date => {
  // Split the date string into an array of year, month, and day
  const [year, month, day] = date.split('-');
  
  // Join the year, month, and day with forward slashes
  return `${year}/${month}/${day}`;
});
const inputValue = ref(props.value);
const emit = defineEmits(['update:modelValue']);

function onChangeHandler(event: any) {
  emit('update:modelValue', event);
}
</script>

<style scoped></style>
