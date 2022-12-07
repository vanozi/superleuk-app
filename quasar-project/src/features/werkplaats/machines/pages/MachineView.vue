<script setup>
import { ref, provide } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMachineStore } from 'src/stores/machine-store'
import Machine from '../components/MachineComponent.vue'
import TankDataTable from '../components/TankDataMachineTable.vue'
import StoringenList from '../../storingen/components/StoringenDataList.vue'


const route = useRoute()

// de machine gegevens voor de pagina ophalen
const { fetchMachine } = useMachineStore();
fetchMachine(Number(route.params.id))
const { machine } = storeToRefs(useMachineStore())
provide('machine', machine)

// Tab dingen
const tab = ref('tankgegevens')

</script>

<template>
  <div>
    <!-- <author
    :author="getAuthorByUserName"
    :posts="getPostsPerAuthor(getAuthorByUserName.id)">
    </author> -->
    <div>
      <Machine v-if="machine" :machine="machine"  />
    </div>

    <!-- Tabs -->
    <!-- <div class="q-pa-md row justify-center">
      <div class="q-gutter-y-md" > -->
        <div class="q-ma-lg">
          <q-tabs dense v-model="tab" >
          <q-tab name="tankgegevens" label="Tanken" />
          <q-tab name="storingen" label="Storingen" />
          <q-tab name="logboek" label="Logboek" />
        </q-tabs>
        </div>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="tankgegevens">
          <div v-if="machine">
            <TankDataTable/>
          </div>
          </q-tab-panel>
          <q-tab-panel name="storingen">
          <div v-if="machine">
            <StoringenList/>
          </div>
          </q-tab-panel>
          </q-tab-panels>
      </div>
    <!-- </div>
  </div> -->
</template>
