<script setup lang="ts">
import { onBeforeMount, provide, ref } from 'vue';
import PVakantieTabel from 'src/components/vakanties/presentational/PVakantieTabel.vue';
import PAddVakantieDialog from 'src/components/vakanties/presentational/PAddVakantieDialog.vue';
import { useVakantiesStore } from 'src/stores/vakanties-store';

const vakantieStore = useVakantiesStore();

const showAddVakantieDialog = ref(false);
provide('showAddVakantieDialog', showAddVakantieDialog);


async function deleteVakantie(id: number) {
  await vakantieStore.deleteVakantie(id);
  await vakantieStore.fetchVakantiesForLoggedInUser();
  await vakantieStore.fetchVakanties();
}

onBeforeMount(async () => {
  await vakantieStore.fetchVakantiesForLoggedInUser();
});



</script>

<template>
  <PVakantieTabel @show-add-vakantie-dialog="showAddVakantieDialog = true" @delete-vakantie="deleteVakantie"
    :vakanties="vakantieStore.vakantiesLoggedInUser" />
  <PAddVakantieDialog v-model="showAddVakantieDialog" />
</template>
