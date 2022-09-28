<template>
    <split-pane-layout>
                    <login-form v-if="mode==='Login'" @attempt-login="saveMemory" @change-mode="changeMode"></login-form>
                    <register-form v-else-if="mode==='Registreer'" @change-mode="changeMode"></register-form>
        {{mode}}
        <ion-button @click="testAxios">
            test axios
        </ion-button>
</split-pane-layout>
</template>
  
<script>
import LoginForm from "@/components/auth/LoginForm.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";
import {
    IonButton
} from "@ionic/vue";
import SplitPaneLayout from "../../components/base/SplitPaneLayout.vue";

export default {
    components: {
    LoginForm,
    RegisterForm,
    IonButton,
    SplitPaneLayout
},
    data() {
        return {
            mode: 'Login'
        }
    },
    methods: {
        changeMode(mode) {
            console.log(mode)
            this.mode = mode
        },
    }
};
</script>
  
<style>

</style>