<template>
  <q-page padding>
    <div class="fit row wrap justify-center items-start content-start">
      <LoginForm
        @submit-form="submitLogin"
        :class="[$q.screen.gt.md ? 'col-4' : 'col-11']"
      />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import FormBuilder from 'src/builders/FormBuilder';
import FormDirector from 'src/builders/FormDirector';
import { useAccountStore } from 'src/stores/account-store';
import { useRouter } from 'vue-router';

// init stores
const accountStore = useAccountStore();
const router = useRouter();

const LoginForm = new FormDirector(new FormBuilder()).makeLoginForm();
const submitLogin = (formValues: any) => {
  console.log(formValues);
  accountStore.loginUser(formValues, function () {
    router.push('/');
  });
};
</script>
