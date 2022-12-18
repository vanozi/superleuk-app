<script setup>
import { inject ,ref } from 'vue';
import { useStoringenStore } from 'src/stores/storingen-store'
import { useQuasar } from "quasar";
const $q = useQuasar();
const storingTeWijzigen = inject('storingTeWijzigen')
const storingsMeldingsdag = inject('storingsMeldingsdag')
const storingsMelder = inject('storingsMelder')
const resetData = function () {
  storingTeWijzigen.value = {};
};
const { updateStoring } = useStoringenStore();
const update = function() {
  storingTeWijzigen.value.machine_id = storingTeWijzigen.value.machine.id
  updateStoring(storingTeWijzigen.value,  function () {
      $q.notify({
        color: "positive",
        textColor: "white",
        icon: "done",
        message: `Storing geupdate`,
      });
    }, function () {
      $q.notify({
        color: "error",
        textColor: "white",
        icon: "warning",
        message: `Er is iets misgegaan`,
      });
    },)
}
const options = ["Nieuw", "In Behandeling", "Gesloten"]

</script>

<template>
    <q-dialog>
      <q-card  style="width : 400px">
        <q-card-section>
          <div class="text-h6">Wijzig storings details</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="storingsMeldingsdag" label="Opgevoerd op" readonly />
          <q-input v-model="storingsMelder" type="text" label="Opgevoerd door" readonly />
          <q-select v-model="storingTeWijzigen.status" :options="options" label="Status" />
          <q-input v-model="storingTeWijzigen.issue_description" type="textarea" label="Omschrijving"/>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuleer" @click="resetData" color="red" v-close-popup />
          <q-btn flat label="OK" color="primary" v-close-popup @click="update"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>
