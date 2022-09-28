<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-toggle>
            <ion-menu-button auto-hide="false" menu="main-menu"></ion-menu-button>
          </ion-menu-toggle>
          <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
        </ion-buttons>

        <ion-buttons slot="end">
          <slot name="actions-end"></slot>
        </ion-buttons>
        <ion-title> {{ pageTitle }} </ion-title>
      </ion-toolbar>
    </ion-header>
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
  IonMenuButton

} from "@ionic/vue";
export default {
  props: ["pageTitle", "pageDefaultBackLink"],
  components: {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonPage,
    IonMenuToggle,
    IonMenuButton

  },
};
</script>

<style scoped>

</style>