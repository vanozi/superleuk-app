<template>
  <n-config-provider :theme="darkBoolean ? darkTheme : lightTheme">
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
</n-config-provider>
</template>

<script setup>
import { IonApp, IonSplitPane, IonRouterOutlet } from '@ionic/vue';
import MenuComponent from './components/layouts/MenuComponent.vue'
import {useRouter} from 'vue-router'
import {ref, computed, watch} from 'vue';
import { darkTheme } from 'naive-ui'

const componentKey = ref(0);

const forceRerender = () => {
  componentKey.value += 1;
};

const router=useRouter();


watch([router.currentRoute], function (newValue, oldValue) {
    console.log(newValue, oldValue)
    forceRerender();
});


// theme op basis van system theme
// initial theme
const theme = ref((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? "dark":"light")
const darkBoolean = computed(() => {return theme.value=='dark' ? true : false})
// waarde na verandering
const newColorScheme = ref(null)
 window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    newColorScheme.value = event.matches ? "dark" : "light";
})
// wacher bekijkt de nieuwe value en zet de theme ref naar de nieuwe waarde
watch(newColorScheme, (newValue, oldValue) => {
    console.log(oldValue + '=>' + newValue)
    theme.value = newValue
})

</script>

<style>
ion-split-pane {
  --side-max-width:300px;
}


</style>