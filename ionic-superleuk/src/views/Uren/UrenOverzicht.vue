<template>

    <base-view>

      <template #default-view-title>Uren - overzicht</template>
      <template #default-view-body>
        <div>{{ post.title }}</div>
      </template>

    </base-view>

</template>


<script >
export default {
  data() {
    return {
      post: {}
    };
  },
};

</script>

<style>

</style>
