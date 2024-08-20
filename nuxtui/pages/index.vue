<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Home" />

      <UDashboardToolbar />

      <UDashboardPanelContent />
    </UDashboardPanel>
  </UDashboardPage>
</template>

<script setup lang="ts">


definePageMeta({
  middleware: ['auth','redirect-admin' ]
})


</script>
