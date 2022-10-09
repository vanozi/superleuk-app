<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-toggle>
            <ion-menu-button  auto-hide="false" menu="main-menu"></ion-menu-button>
          </ion-menu-toggle>
          <ion-back-button 
          
          
          :default-href="pageDefaultBackLink"></ion-back-button>
        </ion-buttons>

        <ion-buttons slot="end">
          <slot name="actions-end"></slot>
        </ion-buttons>
        <ion-title> {{ pageTitle }} </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot/>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonPage,
  IonMenuToggle,
  IonMenuButton,
  IonContent

} from "@ionic/vue";
export default {
  props: ["pageTitle", "pageDefaultBackLink", "backButtonHidden"],
  components: {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonPage,
    IonMenuToggle,
    IonMenuButton,
    IonContent

  },
};
</script>

<style scoped>

</style>