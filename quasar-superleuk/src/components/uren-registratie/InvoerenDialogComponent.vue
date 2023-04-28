<script setup lang="ts">
import FormBuilder from 'src/builders/FormBuilder';
import WorkinghoursFormDirector from 'src/builders/WorkinghoursFormDirector';
import { ref, inject } from 'vue';

const showHourEditDialog = inject('showHourEditDialog');

const LoginForm = new WorkinghoursFormDirector(
  new FormBuilder('opslaan', 'add-working-hours-form')
).addWorkingHoursForm();

const submitLogin = () => {
  console.log('hello');
};

const showDialog = ref(false);
</script>
<template>
  <q-dialog v-model="showHourEditDialog">
    <q-card style="width: 500px">
      <LoginForm
        @submit-form="submitLogin"
        :class="[$q.screen.gt.md ? 'col-4' : 'col-11']"
      />
    </q-card>
  </q-dialog>
</template>
