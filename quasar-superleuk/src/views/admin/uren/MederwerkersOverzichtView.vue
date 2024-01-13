<script setup lang="ts">
import { router } from 'src/router'
import MedewerkerListContainer from "components/medewerkers/containers/MedewerkerTableContainer.vue";
import AppPageTitle from 'components/app/AppPageTitle.vue'
import SingleRow from 'components/app/content-layout/SingleRow.vue'
import { useQuasar } from 'quasar'
const $q = useQuasar()

function routeToUser(id: number) {
  router.push({ name: 'uren-medewerker-overzicht', params: { id: id.toString() } })
}


</script>
<template>
  <q-page-container>
    <q-page>
      <AppPageTitle title="Uren" />
      <SingleRow>
        <MedewerkerListContainer @navigate-to-user="routeToUser" />
      </SingleRow>
    </q-page>
  </q-page-container>
</template>
