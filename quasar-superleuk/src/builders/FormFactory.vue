<template>
  <q-form
    action=""
    @submit.prevent="submit"
    class="form q-pa-md"
    :data-testId="testIdForm"
  >
    <div v-for="field in fields" :key="field.name">
      <component
        :id="field.name"
        :is="field.component"
        v-bind="{ ...field.props, ...field.attrs }"
        @update:modelValue="onChangeHandler($event, field.name)"
      />
      <div class="error" v-if="errors[field.name]">
        {{ errors[field.name] }}
      </div>
    </div>
    <br />
    <q-btn
      type="submit"
      color="primary"
      outline
      :disabled="!submitable"
      :data-testId="`${testIdForm}-submit-button`"
      >{{ nameSubmitButton }}</q-btn
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
  errorsForm: ObjectGeneric;
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
  validator: {
    type: Object as PropType<ObjectGeneric>,
    default: () => ({}),
  },
  nameSubmitButton: {
    type: String,
    default: 'Verstuur',
  },
  testIdForm: {
    type: String,
    default: 'form',
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

const validateForm = function () {
  try {
    errors.value = {};
    props.validator.parse(values.value);
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.issues);
      for (const issue of error.issues) {
        if (!errors.value.hasOwnProperty(issue.path[0])) {
          throwErrors(String(issue.path[0]), false, issue.message);
        }
      }
    }
  }
};

const submit = async function () {
  validateForm();
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

const onChangeHandler = function (payload: any, fieldName: string) {
  values.value[fieldName] = payload;
  validateForm();
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
