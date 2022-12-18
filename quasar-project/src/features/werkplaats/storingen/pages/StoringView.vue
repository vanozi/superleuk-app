<script setup>
import { provide, ref, reactive, computed } from 'vue';
import { useRoute } from 'vue-router'
import { useStoringenStore } from 'src/stores/storingen-store'
import { storeToRefs } from 'pinia'
import StoringDetails from '../components/StoringDetails.vue'
import EditStoringDialogVue from '../components/EditStoringDialog.vue';
import {useUserStore} from 'src/stores/user-store'
const { userHasRole } = useUserStore();
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
</script>


<template>
  <main>
    <StoringDetails />
    <!-- ACTION BUTTONS -->
    <!-- Wijzigen / verwijderen / commentaar toevoegen -->
    <div class="q-pa-md q-gutter-y-md row justify-center">
        <q-btn v-if="userHasRole('monteur')" outline color="warning" label="Wijzigen" icon="edit"
          @click="wijzigStoring = true; Object.assign(storingTeWijzigen, storing)" />
    </div>
    <!-- WIJZIGEN DIALOOG -->
    <EditStoringDialogVue v-model="wijzigStoring" />
   </main>
</template>
