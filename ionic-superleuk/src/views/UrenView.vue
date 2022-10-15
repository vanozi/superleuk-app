<template>
    <base-view>
    <template #default-view-title>Uren</template>
     
        <template #default-view-body>
            <div class="ion-padding">
                <router-view name="urenhome"></router-view>
                <router-view name="ureninvoeren"></router-view>
                <router-view name="urenoverzicht"></router-view>
            </div>

        </template>
    </base-view>
</template>
<script setup>
import BaseView from '../components/layouts/BaseView.vue'
</script>