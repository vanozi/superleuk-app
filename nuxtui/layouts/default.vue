<script setup lang="ts">
const route = useRoute()
const links = [
  {
    id: 'hours',
    label: 'Uren',
    to: '/uren',
    icon: 'i-heroicons-clock',
  }]

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <router-link to="/" class="truncate text-gray-900 dark:text-white font-semibold pt-1">
            Gebr. Vroege
          </router-link>
        </template>
        <template #right>
          <ClientOnly>
            <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="gray"
              variant="ghost" aria-label="Theme" @click="isDark = !isDark" />
            <template #fallback>
              <div class="w-8 h-8" />
            </template>
          </ClientOnly>
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
