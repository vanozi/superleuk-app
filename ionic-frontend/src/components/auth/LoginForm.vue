<template>
    <form action="" class="ion-padding" @submit.prevent="submitForm">
      <ion-list>
        <ion-item>
          <ion-label position="floating" type="email">E-Mail</ion-label>
          <ion-input type="text" required v-model="username"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Wachtwoord</ion-label>
          <ion-input type="password" required v-model="password"></ion-input>
        </ion-item>
        <ion-button expand="block" type="submit">Login</ion-button>
      </ion-list>
    </form>
  </template>
  
  <script>
  import {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  } from "@ionic/vue";
  export default {
    emits: ["attempt-login"],
    components: {
      IonList,
      IonItem,
      IonLabel,
      IonInput,
      IonButton,
    },
    data() {
      return {
        email: "",
        password: ""
      };
    },
    methods: {
      submitForm() {
        const loginData = {
          email: this.email,
          password: this.password,
        };
        this.$emit("attempt-login", loginData);
      },
    },
  };
  </script>
  
  <style>
  </style>