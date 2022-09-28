<template>
  <IonApp>
    <ion-split-pane content-id="main-content"  when="lg">
      <Menu />
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </IonApp>
</template>

<script>
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { defineComponent } from 'vue';
import Menu from './components/MenuComponent.vue'

export default defineComponent({
  name: 'App',
  components: {
    Menu,
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
  }
});
</script>

<style scoped>
  ion-split-pane {
    --side-max-width:300px;
  }
</style>>

