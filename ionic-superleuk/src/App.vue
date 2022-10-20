<template>
  <ion-app>
    <ion-split-pane content-id="main">
      <!--  the side menu  -->
      <menu-component content-id="main" />
      <!-- the main content -->
      <n-message-provider placement="bottom">
        <ion-router-outlet id="main"/>
      </n-message-provider>

    </ion-split-pane>

  </ion-app>
</template>

<script setup>
import { IonApp, IonSplitPane, IonRouterOutlet } from '@ionic/vue';
import MenuComponent from './components/layouts/MenuComponent.vue'
import {useRouter} from 'vue-router'
import {watch} from 'vue';
import { ref } from 'vue';
const componentKey = ref(0);

const forceRerender = () => {
  componentKey.value += 1;
};

const router=useRouter();

console.log(router.currentRoute)

watch([router.currentRoute], function (newValue, oldValue) {
    console.log(newValue, oldValue)
    forceRerender();
});

</script>

<style>
ion-split-pane {
  --side-max-width:300px;
}


</style>