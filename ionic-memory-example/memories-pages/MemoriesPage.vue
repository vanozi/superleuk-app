<template>
  <base-layout pageTitle="All Memories">
    <template v-slot:actions-end>
      <ion-button router-link="/memories/add"></ion-button>
      <ion-icon slot="icon-only" :icon="add"></ion-icon>
    </template>
    <memories-list :memories="memories"> </memories-list>
  </base-layout>
</template>

<script>
import { IonButton, IonIcon } from "@ionic/vue";
import { add } from "ionicons/icons";
import MemoriesList from "../../components/memories/MemoriesList.vue";
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters({
      memories : 'memories/memories' 
    })
  }
};
</script>

<style>

</style>