<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Machines" />
      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>
      <UDashboardPanelContent>
        <UDashboardSection
          icon="i-heroicons-user"
          title="Invoeren"
          description="Invoeren van een nieuwe machine"
          orientation="vertical"
          class="px-4 mt-6"
        />
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<script setup lang="ts">
const links = [[{
  label: 'Overzicht',
  icon: 'i-heroicons-user-circle',
  to: '/machines'
},  {
  label: 'Tanklijst',
  icon: 'i-heroicons-bell'
}], [{
  label: 'Invoeren',
  icon: 'i-heroicons-user-group',
  to: '/machines/invoeren'
},]]
</script>
