<script setup lang="ts">
import FormBuilder from 'src/builders/FormBuilder';
import FormDirector from 'src/builders/FormDirector';
import { ref } from 'vue';

const LoginForm = new FormDirector(
  new FormBuilder('login', 'login-form')
).makeLoginForm();

const submitLogin = () => {
  console.log('hello');
};

const showDialog = ref(false);
</script>
<template>
  <q-page>
    <q-btn label="Alert" color="primary" @click="showDialog = true" />
    <q-dialog v-model="showDialog">
      <q-card>
        <LoginForm
          @submit-form="submitLogin"
          :class="[$q.screen.gt.md ? 'col-4' : 'col-11']"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>
