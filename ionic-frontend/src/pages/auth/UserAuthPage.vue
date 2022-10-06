<template>
    <base-layout :page-Title=mode>
        <login-form v-if="mode==='Login'"  @change-mode="changeMode" @attempt-login="submitLogin($event)"></login-form>
        <register-form v-else-if="mode==='Registreer'" @change-mode="changeMode"></register-form>
    </base-layout>
</template>
  
<script>
import LoginForm from "@/components/auth/LoginForm.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";
import { mapActions, mapGetters } from "vuex"; 
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
                await this.getUserInfo(this.accessToken)
                router.replace("/home")
                router.go()
            }
        },
        ...mapActions({
            performLogin : 'auth/performLogin',
            getUserInfo : 'auth/getUserInfo'
        })
    },
    computed : {
        ...mapGetters({
            accessToken : 'auth/accessToken'
        })
    }
};
</script>
  
<style>

</style>