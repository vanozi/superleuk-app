<template>
  <q-input
    filled
    mask="time"
    :name="props.name"
    v-model="inputValue"
    :label="props.label"
    @update:model-value="onChangeHandler"
    :data-testId="props.testId"
  >
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time v-model="inputValue" format24h>
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { options } from '@fullcalendar/core/preact';
import { QInputProps, QDateProps, QDate } from 'quasar';
import { ref, toRefs, unref, computed } from 'vue';
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
