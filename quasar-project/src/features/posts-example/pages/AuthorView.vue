<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useAuthorStore } from 'src/stores/authors-store'
  import { usePostStore } from 'src/stores/post-store'
  import Author from '../components/AuthorComponent.vue'

  const route = useRoute()
  const { authors } = storeToRefs(useAuthorStore())
  const { getPostsPerAuthor } = storeToRefs(usePostStore())
  const { fetchPosts } = usePostStore()

  const getAuthorByUserName = computed(() => {
    return authors.value.find((author) => author.username === route.params.username)
  })

  fetchPosts()
</script>

<template>
  <div>
    <author
    :author="getAuthorByUserName"
    :posts="getPostsPerAuthor(getAuthorByUserName.id)">
    </author>
  </div>
</template>
