<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useAccountStore } from 'stores/account-store'

// declare stores
const accountStore = useAccountStore()

onBeforeMount(async () => {
  // try to fetch the logged in user data and store it in the store
  await accountStore.fetchLoggedInUserData()
})

</script>
