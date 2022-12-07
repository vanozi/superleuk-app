<script setup>
  import { RouterLink } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useAuthorStore } from 'src/stores/authors-store';

  const { authors } = storeToRefs(useAuthorStore())
  const { fetchAuthors } = useAuthorStore()

  fetchAuthors()
</script>

<template>
  <div v-if="authors">
    <p  v-for="author in authors" :key="author.id">
      <RouterLink :to="`/posts-example/author/${author.username}`">{{ author.name }}</RouterLink>
    </p>
  </div>
</template>
