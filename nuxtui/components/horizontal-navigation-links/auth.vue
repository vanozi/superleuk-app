<template>
  <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
    <UHorizontalNavigation :links="links" />
  </UDashboardToolbar>
</template>

<script setup lang="ts">
const links = [[{
  label: 'Inloggen',
  icon: 'i-lets-icons-sign-in-squre-light',
  to: '/auth/login'
},  {
  label: 'Registeren',
  icon: 'i-clarity-assign-user-line',
    to: '/auth/register'
}],]
</script>
