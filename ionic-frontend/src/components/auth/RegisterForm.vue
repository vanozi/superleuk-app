<template>

    <ion-card>
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
                <ion-item>
                    <ion-label position="floating">Herhaal wachtwoord</ion-label>
                    <ion-input type="password" required></ion-input>
                </ion-item>
                <ion-button expand="block" type="submit" class="ion-margin-top">Registreer</ion-button>
            </ion-list>
        </form>
        <ion-row class="ion-justify-content-center ion-margin-bottom">
            <ion-button  type="button" fill="outline" size="small" @click="changeMode('Login')">
                inloggen ?</ion-button>
        </ion-row>
    </ion-card>
</template>
    
<script>
import {
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonList
} from "@ionic/vue";
export default {
    emits: ["attempt-register", "change-mode"],
    components: {
        IonItem,
        IonList,
        IonLabel,
        IonInput,
        IonButton,
    },
    data() {
        return {
            email: "",
            password: "",

        };
    },
    methods: {
        submitForm() {
            const loginData = {
                email: this.email,
                password: this.password,
            };
            this.$emit("attempt-register", loginData);
        },
        changeMode(mode) {
            this.$emit("change-mode", mode);
        }
    },
};
</script>
    
<style>

</style>