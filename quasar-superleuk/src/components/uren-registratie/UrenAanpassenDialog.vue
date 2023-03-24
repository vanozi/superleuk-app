<script setup lang="ts">
import { inject, computed, ref } from 'vue';
import FormBuilder from 'src/builders/FormBuilder';
import FormDirector from 'src/builders/FormDirector';
const showEventEditDialog: any = inject('showEventEditDialog');
const event: any = inject('selectedEvent');

const formatDate = (date: Date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('nl-NL', options);
};

const editComponent = computed(() => {
  if (showEventEditDialog) {
    return new FormDirector(new FormBuilder()).makeHoursEditForm(event);
  } else {
    return null;
  }
});
</script>

<template>
  <q-dialog v-model="showEventEditDialog" maximized>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ formatDate(event.start) }}</div>
      </q-card-section>
      <q-card-section>
        <!-- <component :is="editComponent" /> -->
        <editComponent />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
