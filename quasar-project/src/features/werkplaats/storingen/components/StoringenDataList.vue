<script setup>
import { inject, computed } from 'vue';
const machine = inject('machine');

// Alle storingen die nog niet gesloten zijn
const issuesNotClosed = computed(()=> machine ? machine.value.maintenance_issues.filter(issue => issue.status !== "Gesloten"): null)
const issueDateFormatter = function (dateString) {
  return dateString.split('T')[0];
}


</script>

<template>
  <q-list bordered separator class="rounded-borders" v-if="(issuesNotClosed.length > 0)">
    <q-item-label header>Storingen / onderhouds issues</q-item-label>
    <q-item v-for="(issue, index) in issuesNotClosed" :key="index" bordered>
      <q-item-section avatar top>
        <q-icon name="event" color="grey-8" size="34px" />
      </q-item-section>

      <q-item-section top class="col-2 gt-sm">
        <q-item-label class="q-mt-sm">{{ issueDateFormatter(issue.created_at) }}</q-item-label>
      </q-item-section>

      <q-item-section top>
        <q-item-label lines="3">
          <span class="text-grey-8 text-weight-medium">{{ issue.issue_description }}</span>
        </q-item-label>
        <q-item-label lines="2">
          <span class="text-weight-light">Status | </span>
          <span class="text-weight-thin">{{ issue.status }}</span>
        </q-item-label>
        <q-item-label>
          <span class="text-weight-light">Gemeld door | </span>
          <span class="text-weight-thin">{{ issue.created_by }}</span>
        </q-item-label>


      </q-item-section>
      <q-item-section side top>
        <q-btn outline :to="('/werkplaats/storing/' + issue.id)">details</q-btn>
      </q-item-section>
    </q-item>
  </q-list>
  <div v-else class="row justify-center q-gutter-x-md ">
    Geen openstaande storingen
  </div>
</template>
