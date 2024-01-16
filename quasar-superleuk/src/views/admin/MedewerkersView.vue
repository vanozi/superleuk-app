<script setup lang="ts">
import { router } from 'src/router'
import MedewerkerListContainer from "components/medewerkers/containers/MedewerkerTableContainer.vue";
import AppPageTitle from 'components/app/AppPageTitle.vue'
import SingleRow from 'components/app/content-layout/SingleRow.vue'
function routeToUser(id: number) {
  router.push({ name: 'admin-medewerker-profile', params: { id: id.toString() } })
}


</script>

<template>
  <q-page-container>
    <q-page>
      <AppPageTitle title="Profielen" />
      <SingleRow>
        <MedewerkerListContainer @navigate-to-user="routeToUser" />
      </SingleRow>
    </q-page>
  </q-page-container>
</template>
