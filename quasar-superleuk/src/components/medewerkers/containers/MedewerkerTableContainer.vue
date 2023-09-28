<script setup lang="ts">

import PMedewerkersList from "components/medewerkers/presentational/PMedewerkersTable.vue";
import {IMedewerker, useMedewerkersStore} from "stores/admin/medewerkers-store";
import {onBeforeMount, ref} from "vue";
import {router} from 'src/router'
const medewerkersStore = useMedewerkersStore();

onBeforeMount(() => {
  medewerkersStore.fetchMedewerkers();
})

function routeToUserProfile(id: number) {
  console.log('route to user profile', id)
  router.push({name: 'admin-medewerker-profile', params: {id: id.toString()}})
}
</script>
<template>

      <PMedewerkersList :users="medewerkersStore.medewerkers"  @navigate-to-user-profile="routeToUserProfile"/>

</template>
