<script setup lang="ts">
const route = useRoute()
const links = [
{
  id: 'hours',
  label: 'Uren',
  to: '/uren',
  icon: 'i-heroicons-clock',
}]
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <router-link to="/" class="truncate text-gray-900 dark:text-white font-semibold">
            Gebr. Vroege
          </router-link>
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
