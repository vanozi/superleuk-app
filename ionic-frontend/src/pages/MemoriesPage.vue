<template>
  <base-layout pageTitle="All Memories">
    <template v-slot:actions-end>
      <ion-button router-link="/memories/add"></ion-button>
      <ion-icon slot="icon-only" :icon="add"></ion-icon>
    </template>
    <memories-list :memories="memories"> </memories-list>
    <ion-button @click="logDeviceInfo">device info</ion-button>
  </base-layout>
</template>

<script>
import { Device } from '@capacitor/device'
import { IonButton, IonIcon } from "@ionic/vue";
import { add } from "ionicons/icons";
import MemoriesList from "../components/memories/MemoriesList.vue";
export default {
  components: {
    IonButton,
    IonIcon,
    MemoriesList,
  },
  data() {
    return {
      add,
    };
  },
  methods: {
    async logDeviceInfo() {
      const info = await Device.getInfo();
      const id = await Device.getId();
      const deviceId = info.platform + info.model + id.uuid;
      console.log(deviceId)
    },
  },
  computed: {
    memories() {
      return this.$store.getters.memories;
    },
  },
};
</script>

<style>

</style>