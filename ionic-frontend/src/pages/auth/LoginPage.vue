<template>
    <base-layout page-title="Login">
        <ion-grid>
            <ion-row >
                <ion-col>
                    <login-form></login-form>
                </ion-col>
            </ion-row>
        </ion-grid>

    </base-layout>
</template>
  
<script>
import BaseLayout from "@/components/base/BaseLayout.vue";
import LoginForm from "@/components/auth/LoginForm.vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";


export default {
    components: {
        BaseLayout,
        LoginForm,
        IonGrid,
        IonRow,
        IonCol
    },
    // methods: {
    //   attemptLogin(loginData) {
    //     this.$store.dispatch("addMemory", memoryData);
    //     this.$router.replace("/");
    //   },
    // },
};
</script>
  
<style>

</style>