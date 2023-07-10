<template>
  <q-form
    action=""
    @submit.prevent="submit"
    class="form q-pa-md"
    :data-testId="testIdForm"
  >
    <div v-for="field in fields" :key="field.name">
      <component
        :is="field.component"
        v-bind="{ ...field.props, ...field.attrs }"
        @update:modelValue="onChangeHandler($event, <string>field.name)"
      />
      <div class="error" v-if="errors[field.name]">
        {{ errors[field.name] }}
      </div>
    </div>
    <br/>
    <div class="row">
      <q-btn
        v-if="deletable"
        unelevated
        outline
        color="negative"
        label="verwijderen"
        @click="onDeleteFormItemHandler"
      />
      <q-space/>
      <q-btn-group unelevated>
        <div v-for="button in buttons" :key="button.name">
          <component
            :is="button.component"
            v-bind="{ ...button.props }"
            @clickButton="(clickFunction:string)=>onClickHandler(clickFunction)"
          />
        </div>
        <q-btn
          type="submit"
          color="positive"
          outline
          :disabled="!submitable"
          :data-testId="`${testIdForm}-submit-button`"
          :label="nameSubmitButton"
        ></q-btn
        >
      </q-btn-group>
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import {ref, computed, onMounted, type PropType} from 'vue';
import {ZodError} from 'zod';
import type {Field, ObjectGeneric, Button} from './form-builder';

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
  deletable: {
    type: Boolean,
    default: false,
  },
  fullData: {
    default: {},
  },
  fields: {
    type: Array as PropType<Field[]>,
    default: () => [],
  },
  buttons: {
    type: Array as PropType<Button[]>,
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
  (e: 'clickButton', clickFunction: string): void;
  (e: 'deleteFormItem', formValues: ObjectGeneric): void;
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
  props.fields.forEach(({name, props, attrs}) => {
    if (props?.value != undefined) {
      values.value[name] = props.value;
    }
    if (attrs?.value != undefined) {
      values.value[name] = attrs.value;
    }
  });
});

const validateForm = function () {
  try {
    errors.value = {};
    props.validator.parse(values.value);
  } catch (error) {
    if (error instanceof ZodError) {
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
  console.log(fieldName)
  values.value[fieldName] = payload;
  validateForm();
};

const onClickHandler = function (clickFuntion: string) {
  emit('clickButton', clickFuntion);
};

const onDeleteFormItemHandler = function () {
  emit('deleteFormItem', props.fullData)
}
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
