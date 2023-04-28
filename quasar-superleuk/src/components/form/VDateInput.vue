<template>
  <q-input
    :name="props.name"
    v-model="inputValue"
    :label="props.label"
    @update:model-value="onChangeHandler"
    :data-testId="props.testId"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="inputValue" mask="YYYY-MM-DD">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon> </template
  ></q-input>
</template>

<script setup lang="ts">
import { QInputProps } from 'quasar';
import { ref } from 'vue';
const props = defineProps<{
  name: string;
  type: QInputProps['type'];
  value: QInputProps['modelValue'];
  label: string;
  testId?: string;
}>();

const inputValue = ref(props.value);

const emit = defineEmits(['update:modelValue']);

function onChangeHandler(event: any) {
  emit('update:modelValue', event);
}
</script>

<style scoped></style>
