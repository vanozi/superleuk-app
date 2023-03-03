<template>
  <form @submit="onSubmit" class="q-gutter-md" data-test="login-form">
    <QInputWithValidation v-model="formValues.email" name="email" type="text" label="Email" data-test="email-input" />
    <QInputWithValidation v-model="formValues.password" name="password" type="password" label="Wachtwoord"
      data-test="password-input" />
    <q-btn outline square type="submit" :disabled="isSubmitting || !meta.dirty || !meta.valid" color="primary"
      icon="check" label="Inloggen" data-test="submit-button" />
  </form>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import QInputWithValidation from '../inputs/QInputWithValidation.vue';
import { LoginFormInterface } from 'src/models/typescipt-models'
import { useAccountStore } from 'stores/account-store'
import { AppFacingValidations } from 'src/models/validations'
import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// define stores
const accountStore = useAccountStore();

// initialize composables
const router = useRouter();
const route = useRoute();

// initalize data
const formValues = reactive({
  email: '',
  password: ''
})

// form validation schema
const schema = yup.object({
  email: yup.string().required(AppFacingValidations.required).email(AppFacingValidations.incorrectEmail),
  password: yup.string().required(AppFacingValidations.required),
});

// useForms composable
const { handleSubmit, isSubmitting, meta } = useForm({
  initialValues: formValues,
  validationSchema: schema
})

// submit handler
const onSubmit = handleSubmit((values: LoginFormInterface): void => {
  accountStore.logInUser(values, function () {
    router.push('/')
  });
});


</script>
