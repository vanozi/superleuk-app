<script setup lang="ts">
import AppPageTitle from 'components/app/AppPageTitle.vue'
import SingleRow from 'components/app/content-layout/SingleRow.vue'
import MedewerkerProfileContainer from "components/medewerkers/containers/MedewerkerProfileContainer.vue";
</script>

<template>
  <q-page-container>
    <q-page>
      <AppPageTitle title="Profiel" />
      <SingleRow>
        <MedewerkerProfileContainer />
      </SingleRow>
    </q-page>
  </q-page-container>
</template>
