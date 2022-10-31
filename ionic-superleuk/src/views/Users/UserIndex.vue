<template>
    <base-view>
        <template #default-view-body>
            <div class="user">
                <h2>User {{ $route.params.id }}</h2>
                <router-view name="userhome"></router-view>
                <router-view name="userprofile"></router-view>
            </div>
        </template>
    </base-view>
</template>
<script setup>
import BaseView from '../../components/layouts/BaseView.vue'
</script>