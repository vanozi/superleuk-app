<script setup lang="ts">

import PMedewerkersList from "components/medewerkers/presentational/PMedewerkersTable.vue";
import { useMedewerkersStore } from "stores/admin/medewerkers-store";
import { onBeforeMount } from "vue";


const emits = defineEmits(['navigate-to-user'])

const medewerkersStore = useMedewerkersStore();

onBeforeMount(() => {
  medewerkersStore.fetchMedewerkers();
})


function routeToUser(id: number) {
  emits('navigate-to-user', id)
}

</script>
<template>
  <PMedewerkersList :users="medewerkersStore.medewerkers" @navigate-to-user="routeToUser" />
</template>
