<script setup lang="ts">

const links = [
{
  label: 'Gebruikers',

  icon: 'i-pepicons-pencil-people-circle',
  children: [{
    label: 'Medewerkers',
    to: '/admin/medewerkers/overzicht',
    exact: true
  },
  {
    label: 'Admins',
    to: '/admin/admins',
    exact: true
  }]},
{
  label: 'Koeien',
  icon : 'i-fluent-emoji-high-contrast-cow-face',
  children: [{
    label: 'Klauwgezondheid',
    to: '/admin/koeien/klauwscore',
    exact: true
  }]}]
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <span class="truncate text-gray-900 dark:text-white font-semibold">Gebr. Vroege</span>
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <UDashboardSidebarLinks :links="links" />
        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />
  </UDashboardLayout>
</template>
