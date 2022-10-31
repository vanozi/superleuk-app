<template>
  <base-view>
    <template #default-view-title>
      <ion-title>Home</ion-title>
    </template>
    <template #default-view-body>
      <p>
        {{data}} / {{isFinished}}
      </p>

      <p v-if="response">
        {{response.status}}
      </p>
    </template>
  </base-view>
</template>
  
<script setup>
import { useAxiosGet } from "../composables/axios"

const url = '/tank_transactions/'

const { response, data, isFinished } = useAxiosGet(url)




</script>