<template>
    <base-layout :page-title=mode>
        <ion-card>
            <form action="" class="ion-padding" @submit.prevent="submitForm">
                <ion-list>
                    <login-form v-if="mode==='Login'"></login-form>
                    <register-form v-else-if="mode==='Registreer'"></register-form>
                </ion-list>
            </form>
        </ion-card>

        {{mode}}
    </base-layout>
</template>
  
<script>
import BaseLayout from "@/components/base/BaseLayout.vue";
import LoginForm from "@/components/auth/LoginForm.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";
import {
    IonCard,
    IonList,
} from "@ionic/vue";

export default {
    components: {
        BaseLayout,
        LoginForm,
        RegisterForm,
        IonCard,
        IonList,
    },
    data() {
        return {
            mode: 'Login'
        }
    },
    methods: {
        changeMode(mode) {
            this.mode = mode
        }
    }
};
</script>
  
<style>

</style>