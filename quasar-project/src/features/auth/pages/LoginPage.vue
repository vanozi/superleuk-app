<template>
  <q-page class="flex flex-center">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px"> -->
    <LoginForm />
  </q-page>
</template>

<script>
import LoginForm from 'src/features/auth/components/LoginForm.vue';
import { defineComponent } from 'vue'

export default defineComponent({
  name: "login-page",
  components: { LoginForm }
})
</script>


<!-- <route lang="yaml">
meta:
  layout: logged-out
</route> -->
