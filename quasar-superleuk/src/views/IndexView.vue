<template>
  <q-page class="row items-center justify-evenly">
    {{useAccountStore().loggedInUser}}
  </q-page>
</template>

<script setup lang="ts">
import {useAccountStore} from "stores/account-store";
</script>
