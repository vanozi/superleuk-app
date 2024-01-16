<script lang="ts" setup>
// imports
import FormBuilder from 'src/forms/form-builder';
import AuthForms from 'src/forms/auth-forms';
import { useAccountStore } from 'src/stores/account-store';
import { useRouter } from 'vue-router';

// init stores
const accountStore = useAccountStore();
const router = useRouter();

const LoginForm = new AuthForms(
  new FormBuilder('login', 'login-custom-quasar')
).makeLoginForm();

const submitLogin = (formValues: any) => {
  accountStore.loginUser(formValues, function () {
    router.push('/');
  });
};
</script>


<template>
  <q-page padding>
    <div class="fit column items-start content-center">
      <LoginForm @submit-form="submitLogin" :class="[$q.screen.gt.md ? '' : 'full-width']"
        :style="[$q.screen.gt.md ? 'width:400px' : '']" />
      <router-link to="/auth/forgot-password">Wachtwoord
        vergeten?
      </router-link>
    </div>
  </q-page>
</template>
