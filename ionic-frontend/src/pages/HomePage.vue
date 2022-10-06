<template>
    <base-layout page-Title="Home">
        {{logged_in_user}}
        {{access_token}}
        {{logged_in_device_id}}
    </base-layout>
</template>

<script>
import BaseLayout from "@/components/base/BaseLayout.vue";
import { mapGetters } from 'vuex'
export default {
    components: { BaseLayout },
    data: () => ({
    }),
    methods: {
    },
    computed: {
        ...mapGetters({
            access_token: 'auth/accessToken',
            logged_in_user : 'auth/loggedInUser',
            logged_in_device_id : 'auth/loggedIndeviceId'
        })
    },
}

</script>

<style>

</style>