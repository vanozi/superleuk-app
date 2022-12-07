<template>
  <q-page class="flex flex-center">
    <RouterLink to="/posts-example/posts">Posts</RouterLink> -
    <RouterLink to="/posts-example/authors">Authors</RouterLink>
  </q-page>
</template>

<script>
// import LoginForm from 'src/features/auth/components/LoginForm.vue';
import { defineComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router';


export default defineComponent({
  name: "IndexPage",
  // components: { LoginForm }
})
</script>

<!-- <route lang="yaml">
meta:
  layout: main
</route> -->
