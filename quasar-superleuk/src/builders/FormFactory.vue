<template>
  <q-form action="" @submit.prevent="submit" class="form q-pa-md">
    <div v-for="(field, index) in fields" :key="field.name">
      <component
        :id="field.name"
        :is="field.component"
        v-bind="{ ...field.props, ...field.attrs }"
        @update:modelValue="onChangeHandler($event, field.name, index)"
      />
      <div class="error" v-if="errors[field.name]">
        {{ errors[field.name] }}
      </div>
    </div>
    <br />
    <q-btn type="submit" color="primary" outline :disabled="!submitable"
      >Verstuur</q-btn
    >
  </q-form>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, type PropType } from 'vue';
import { ZodError } from 'zod';
import type { Field, ObjectGeneric } from './FormBuilder';

export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export interface DataStructure {
  values: ObjectGeneric;
  errors: ObjectGeneric;
}

const props = defineProps({
  id: {
    type: [String, Number],
    default: null,
  },
  fields: {
    type: Array as PropType<Field[]>,
    default: () => [],
  },
});

const emit = defineEmits<{
  (e: 'submitForm', formValues: ObjectGeneric): void;
}>();

// variables
const errors: ObjectGeneric = ref({});
const values: ObjectGeneric = ref({});

// computed properties
const submitable = computed(() => {
  const errorCount: number = [...Object.keys(errors.value)].filter(
    (i) => errors.value[i] != undefined
  ).length;
  return errorCount === 0;
});

// lifecycle hooks
onMounted(() => {
  props.fields.forEach(({ name, props }) => {
    if (props?.value != undefined) {
      values.value[name] = props.value;
    }
  });
  // values.value = values;
});

// functions
const validate = function (value: string, validator: any): ValidationResult {
  try {
    validator.parse(value);
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        valid: false,
        message: error.issues[0].message,
      };
    }
  }
  return {
    valid: true,
  };
};

const submit = async function () {
  for (const { name, validation } of props.fields) {
    const { valid, message } = validate(values.value[name], validation);
    throwErrors(name, valid, message);
  }
  if (submitable.value) {
    emit('submitForm', values.value);
  }
};

const throwErrors = function (
  fieldName: string,
  valid: boolean,
  message: string | undefined
) {
  if (!valid) {
    errors.value = {
      ...errors.value,
      [fieldName]: message,
    };
  } else {
    errors.value = {
      ...errors.value,
      [fieldName]: undefined,
    };
  }
};

const onChangeHandler = function (
  payload: any,
  fieldName: string,
  fieldNumber: number
) {
  const validator = props.fields[fieldNumber].validation;
  const { valid, message } = validate(payload, validator);
  throwErrors(fieldName, valid, message);
  values.value[fieldName] = payload;
};
</script>

<style scoped>
.error {
  color: rgb(242, 96, 96);
}
.label {
  color: gray;
  padding-right: 10px;
}
</style>
