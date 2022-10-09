<template>
    <base-layout :page-Title=mode backButtonHidden="true">
        <login-form v-if="mode==='Login'"  @change-mode="changeMode" @attempt-login="submitLogin($event)"></login-form>
        <register-form v-else-if="mode==='Registreer'" @change-mode="changeMode"></register-form>
    </base-layout>
</template>
  
<script>
import LoginForm from "@/components/auth/LoginForm.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";
import { mapActions } from "vuex"; 
import router from "../../router";

export default {
    components: {
        LoginForm,
        RegisterForm
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
        async submitLogin(loginData){
            let response = await this.performLogin(loginData)
            console.log(response)
            if(response.status == 200) {
                await this.getUserInfo(response.data['access_token'])
                router.replace("/home")
            }
        },
        ...mapActions({
            performLogin : 'auth/performLogin',
            getUserInfo : 'auth/getUserInfo'
        })
    },
};
</script>
  
<style>

</style>