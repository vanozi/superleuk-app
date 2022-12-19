<script setup>
// Vue
import { inject, computed, reactive } from 'vue'
// quasar 
import { useQuasar, date } from "quasar";
// pinia / store
import { useStoringenStore } from 'src/stores/storingen-store'
import { useUserStore } from 'src/stores/user-store'
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();
const {user} = storeToRefs(useUserStore());
const storingsMeldingsdag = date.formatDate(new Date(), 'YYYY-MM-DD')
const storingsMelder = computed(() => {return `${user.value.first_name} ${user.value.last_name}`})
const machine = inject('machine')
const storing = reactive({status:'Nieuw', machine_id:machine.value.info.id})


const resetData = function () {
    Object.assign(storing, {status:'Nieuw', machine_id:machine.value.info.id})
};

const { postNewStoring } = useStoringenStore();
const saveNewStoring = function() {
  postNewStoring(storing,  function () {
      $q.notify({
        color: "positive",
        textColor: "white",
        icon: "done",
        message: `Storing aangemaakt`,
      });
      router.go();
    }, function () {
      $q.notify({
        color: "error",
        textColor: "white",
        icon: "warning",
        message: `Er is iets misgegaan`,
      });
    },)
}

</script>

<template>
    <q-dialog>
      <q-card  style="width : 400px">
        <q-card-section>
          <div class="text-h6">Nieuwe storing aanmaken</div>
          <p>{{ machine.info.work_number }} - {{ machine.info.work_name }}</p>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="storingsMeldingsdag" label="Opgevoerd op" readonly />
          <q-input v-model="storingsMelder" type="text" label="Opgevoerd door" readonly />
          <q-input v-model="storing.status" label="Status" readonly/>
          <q-input v-model="storing.issue_description" type="textarea" label="Omschrijving"/>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuleer" @click="resetData" color="red" v-close-popup />
          <q-btn flat label="OK" color="primary" v-close-popup @click="saveNewStoring"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>
