<template>
{{comments}}
</template>

<script setup>
import { useCommentStore } from 'src/stores/comment-store';
import { storeToRefs } from 'pinia';

const { comments , loading, error } = storeToRefs(useCommentStore())
const { fetchComments } = useCommentStore();

fetchComments();
</script>
