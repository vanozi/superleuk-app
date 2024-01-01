<script setup lang="ts">
import { router } from 'src/router'
import MedewerkerListContainer from "components/medewerkers/containers/MedewerkerTableContainer.vue";

function routeToUser(id: number) {
  router.push({ name: 'admin-medewerker-profile', params: { id: id.toString() } })
}


</script>
<template>
  <div class="row justify-center items-center">
    <div class="col-xs-10 col-sm-10">
      <div class="text-h5 q-mt-md">Medewerkers</div>
    </div>
  </div>
  <div class="row justify-center items-center">
    <div class="col-xs-10 col-sm-10">
      <MedewerkerListContainer @navigate-to-user="routeToUser" />
    </div>
  </div>
</template>
