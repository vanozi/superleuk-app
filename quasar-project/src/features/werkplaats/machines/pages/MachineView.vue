<script setup>
import { ref, provide, computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useMachineStore } from "src/stores/machine-store";
import Machine from "../components/MachineComponent.vue";
import TankDataTable from "../components/TankDataMachineTable.vue";
import StoringenList from "../../storingen/components/StoringenDataList.vue";

const route = useRoute();

// de machine gegevens voor de pagina ophalen
const { fetchMachine } = useMachineStore();
fetchMachine(Number(route.params.id));
const { machine } = storeToRefs(useMachineStore());
provide("machine", machine);
const tab = ref("storingen");


</script>

<template>
  <q-page>
    <div v-if="machine && tab">
      <div>
        <Machine :machine="machine" />
      </div>

      <!-- Tabs -->
      <!-- <div class="q-pa-md row justify-center">
      <div class="q-gutter-y-md" > -->
      <div class="q-ma-lg">
        <q-tabs dense v-model="tab">
          <q-tab
            name="tankgegevens"
            label="Tanken"
            v-if="machine.tank_transactions.length > 0"
          />
          <q-tab name="storingen" label="Storingen" />
          <q-tab name="logboek" label="Logboek" />
        </q-tabs>
      </div>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel
          name="tankgegevens"
          v-if="machine.tank_transactions.length > 0"
        >
          <div>
            <TankDataTable />
          </div>
        </q-tab-panel>
        <q-tab-panel name="storingen">
          <div v-if="machine">
            <StoringenList />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>
