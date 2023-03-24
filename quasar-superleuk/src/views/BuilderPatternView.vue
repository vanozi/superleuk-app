<template>
  <LoginForm />
</template>

<script lang="ts">
import FormBuilder from 'src/builders/FormBuilder';
import FormDirector from 'src/builders/FormDirector';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    LoginForm: new FormDirector(new FormBuilder()).makeLoginForm(),
  },
});
</script>
