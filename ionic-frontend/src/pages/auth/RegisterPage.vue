<template>
    <base-layout page-title="Registreer">
        <register-form></register-form>
    </base-layout>
</template>
  
<script>
import BaseLayout from "@/components/base/BaseLayout.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";


export default {
    components: {
        BaseLayout,
        RegisterForm
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