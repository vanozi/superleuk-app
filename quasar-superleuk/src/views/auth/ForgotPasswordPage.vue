<script setup lang="ts">
import FormBuilder from 'src/builders/FormBuilder';
import FormDirector from 'src/builders/FormDirector';
import { useAccountStore } from 'src/stores/account-store';
import { useRouter } from 'vue-router';

// init stores
const accountStore = useAccountStore();
const router = useRouter();

const ForgotPasswordForm = new FormDirector(
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
