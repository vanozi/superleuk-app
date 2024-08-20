<template>
  <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
    <UHorizontalNavigation :links="links" />
  </UDashboardToolbar>
</template>

<script setup lang="ts">
const links = [[{
  label: 'Beheren',
  icon: 'i-ic-baseline-manage-history',
  to: '/uren/beheren'
},  {
  label: 'Overzicht',
  icon: 'i-material-symbols-overview-outline-rounded',
    to: '/uren/overzicht'
}],]
</script>
