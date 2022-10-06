<template>
  <div>
    <ion-row class="ion-justify-content-center">
      <ion-card style="width:800px" >
        <form action="" class="ion-padding-start ion-padding-end ion-padding-top" @submit.prevent="submitForm">
          <ion-list>
            <ion-item>
              <ion-label position="floating" type="email">E-Mail</ion-label>
              <ion-input type="text" required v-model="email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Wachtwoord</ion-label>
              <ion-input type="password" required v-model="password"></ion-input>
            </ion-item>
            <ion-button expand="block" class="ion-margin-top " type="submit">Login</ion-button>
          </ion-list>
        </form>
        <ion-row class="ion-justify-content-center ion-margin-bottom" >
          <ion-button type="button" fill="outline" size="small"
            @click="changeMode('Registreer')">
            registeren ?</ion-button>
          <ion-button  type="button" fill="outline" size="small"
            @click="changeMode('Wachtwoord vergeten')">
            wachtwoord vergeten ?</ion-button>
        </ion-row>
      </ion-card>
    </ion-row>
    <ion-row class="ion-justify-content-center">

    </ion-row>
  </div>


</template>
  
<script>
import { mapGetters } from 'vuex'
import {
  IonItem,
  IonButton,
  IonLabel,
  IonInput,
  IonList,
  IonRow,
  IonCard
} from "@ionic/vue";
export default {
  emits: ["attempt-login", "change-mode"],
  components: {
    IonItem,
    IonLabel,
    IonInput,
    IonList,
    IonButton,
    IonRow,
    IonCard
  },
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
    };
  },
  methods: {
    submitForm() {
      const loginData = {
        email: this.email,
        password: this.password,
        deviceId : this.logged_in_device_id
      };
      this.$emit("attempt-login", loginData);
    },
    changeMode(mode) {
      this.$emit("change-mode", mode);
    }
  },
  computed: {
        ...mapGetters({
            logged_in_device_id : 'auth/loggedIndeviceId'
        })
    },
};
</script>
  
<style>

</style>