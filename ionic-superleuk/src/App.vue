<template>
  <ion-app>
    <ion-split-pane contentId="main" when="lg">
      <!--  the side menu  -->
      <menu-component />
      <!-- the main content -->
      <n-message-provider placement="bottom">
        <router-view id="main" />
      </n-message-provider>

    </ion-split-pane>

  </ion-app>
</template>

<script setup>
import { IonApp, IonSplitPane } from '@ionic/vue';
import MenuComponent from './components/layouts/MenuComponent.vue'



</script>

<style>
ion-split-pane {
  --side-max-width:300px;
}


</style>