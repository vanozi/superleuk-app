<script setup>
import { provide, ref, reactive, computed } from 'vue';
import { useRoute } from 'vue-router'
import { useStoringenStore } from 'src/stores/storingen-store'
import { storeToRefs } from 'pinia'
import StoringDetails from '../components/StoringDetails.vue'
import EditStoringDialogVue from '../components/EditStoringDialog.vue';
const route = useRoute();
const { fetchStoring } = useStoringenStore();
fetchStoring(Number(route.params.id))
const { storing } = storeToRefs(useStoringenStore())
const storingTeWijzigen = ref({});

const storingsMelder = computed(() => storing ? storing.value.user.first_name + ' ' + storing.value.user.last_name : null)
const storingsMeldingsdag = computed(() => storing ? storing.value.created_at.split('T')[0] : null)
const wijzigStoring = ref(false)
provide('storing', storing)
provide('storingsMelder', storingsMelder)
provide('storingTeWijzigen', storingTeWijzigen)
provide('storingsMeldingsdag', storingsMeldingsdag)
const options = ["Nieuw", "In Behandeling", "Gesloten"]

</script>
<template>
  <main>
    <StoringDetails />
    <!-- ACTION BUTTONS -->
    <!-- Wijzigen / verwijderen / commentaar toevoegen -->
    <div class="q-pa-md q-gutter-y-md column items-center">
      <q-btn-group outline>
        <q-btn outline color="warning" label="Wijzigen" icon="edit"
          @click="wijzigStoring = true; Object.assign(storingTeWijzigen, storing)" />
        <q-btn outline color="red" label="Verwijderen" icon="delete" />
        <q-btn outline color="primary" label="Commentaar toevoegen" icon="add" />
      </q-btn-group>
    </div>
    <!-- WIJZIGEN DIALOOG -->
    <EditStoringDialogVue v-model="wijzigStoring" />
    {{ storingTeWijzigen }}


  </main>
</template>
