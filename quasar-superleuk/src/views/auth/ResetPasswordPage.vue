<script setup lang="ts">
import FormBuilder from 'src/forms/form-builder';
import AuthForms from 'src/forms/auth-forms';
import { useAccountStore } from 'src/stores/account-store';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

// init stores
const accountStore = useAccountStore();
const router = useRouter();
const route = useRoute();

const ResetPasswordForm = new AuthForms(
  new FormBuilder()
).makeResetPasswordForm();

const submitResetPassword = (formValues: any) => {
  accountStore.resetPassword(
    formValues.password,
    route.params.token,
    function () {
      router.push('/auth/login');
    }
  );
};
</script>

<template>
  <q-page padding>
    <div class="fit row wrap justify-center items-start content-start">
      <ResetPasswordForm
        @submit-form="submitResetPassword"
        :class="[$q.screen.gt.md ? 'col-4' : 'col-11']"
      />
    </div>
  </q-page>
</template>
