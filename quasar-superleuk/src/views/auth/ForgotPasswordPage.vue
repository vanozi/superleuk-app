<script setup lang="ts">
// imports
import FormBuilder from 'src/forms/form-builder';
import AuthForms from 'src/forms/auth-forms';
import { useAccountStore } from 'src/stores/account-store';
import { useRouter } from 'vue-router';

// init stores
const accountStore = useAccountStore();
const router = useRouter();

const ForgotPasswordForm = new AuthForms(
  new FormBuilder()
).makeForgotPasswordForm();

const submitForgotPassword = (formValues: any) => {
  accountStore.forgotPassword(formValues.email, function () {
    router.push('/auth/login');
  });
};
</script>

<template>
  <q-page padding>
    <div class="fit row wrap justify-center items-start content-start">
      <ForgotPasswordForm
        @submit-form="submitForgotPassword"
        :class="[$q.screen.gt.md ? 'col-4' : 'col-11']"
      />
    </div>
  </q-page>
</template>
