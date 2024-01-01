<script setup lang="ts">
import { useAccountStore } from "stores/account-store";
import AppPageTitle from "src/components/app/AppPageTitle.vue";
import SingleRow from "src/components/app/content-layout/SingleRow.vue";
import AppButton from "src/components/app/AppButton.vue";
const welkomsTekst = `Welkom ${useAccountStore().loggedInUser?.first_name} ${useAccountStore().loggedInUser?.last_name}`;
import { router } from "src/router";
</script>

<template>
  <q-page-container>
    <q-page>
      <app-page-title title=Home />
      <!-- Welkoms tekst -->
      <single-row>
        <div class="text-subtlte1">
          {{ welkomsTekst }}
        </div>
      </single-row>
      <!-- Uren  -->
      <single-row>
        <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6">Overzicht uren</div>
            <div>Ingediend deze week</div>
            <div>Ingediend deze maand</div>
            <div>Ingediend dit jaar</div>
          </q-card-section>

        </q-card>
      </single-row>
    </q-page>

  </q-page-container>
</template>

