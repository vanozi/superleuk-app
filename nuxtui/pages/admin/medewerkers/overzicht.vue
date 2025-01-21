<script lang="ts" setup>
import { useAdminUsersStore } from '~/stores/admin/users-store'
import { AdminUsersService } from '~/utils/client/services.gen'

definePageMeta({
  middleware: 'admin',
  layout: 'admin'
})

const defaultColumns = [
  { key: 'name', label: 'Naam',},
  { key: 'email', label: 'Email', },
  { key: 'status', label: 'Status' }
]

const filterMedewerkers = ref('')
const selectedColumns = ref(defaultColumns)
const input = ref<{ input: HTMLInputElement }>()
const adminUsersStore = useAdminUsersStore()
const pending = ref(false)

const activeUsersCount = computed(() => adminUsersStore.users.filter(user => user.is_active).length)
const inactiveUsersCount = computed(() => adminUsersStore.users.filter(user => !user.is_active).length)

onBeforeMount(async () => {
  pending.value = true
  try {
    const response = await AdminUsersService.adminUsersGetAllUsers()
    adminUsersStore.users = response
  } finally {
    pending.value = false
  }
})

const columns = computed(() => defaultColumns.filter(column => selectedColumns.value.includes(column)))

const filteredUsers = computed(() => {
  const query = filterMedewerkers.value.toLowerCase()
  return adminUsersStore.users.filter(user => {
    return (
      user.first_name?.toLowerCase().includes(query) ||
      user.last_name?.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    )
  })
})

const page = ref(1)
const pageCount = 20

const paginatedFilteredUsers = computed(() => {
  return filteredUsers.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

defineShortcuts({
  '/': () => {
    input.value?.input?.focus()
  }
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Medewerkers">
        <template #badge>
          <UBadge :label="`${activeUsersCount} actief`" color="green" variant="subtle" class="mr-2" />
          <UBadge :label="`${inactiveUsersCount} inactief`" color="red" variant="subtle" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UInput
            ref="input"
            v-model="filterMedewerkers"
            icon="i-heroicons-funnel"
            autocomplete="off"
            placeholder="Filter medewerkers..."
            @keydown.esc="$event.target.blur()"
          />
          <USelectMenu
            v-model="selectedColumns"
            icon="i-heroicons-adjustments-horizontal-solid"
            :options="defaultColumns"
            multiple
          >
            <template #label>Kolommen</template>
          </USelectMenu>
        </template>
      </UDashboardToolbar>

      <UTable
        :rows="paginatedFilteredUsers"
        :columns="columns"
      >
        <template #name-data="{ row }">
          <div class="flex items-center gap-3">
            <span class="text-gray-900 dark:text-white font-medium">{{ row.first_name }} {{ row.last_name }}</span>
          </div>
        </template>

        <template #status-data="{ row }">
          <UBadge
            :label="row.is_active ? 'Actief' : 'Inactief'"
            :color="row.is_active ? 'green' : 'red'"
            variant="subtle"
            class="capitalize"
          />
        </template>
      </UTable>
      <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
        <UPagination v-model="page" :page-count="pageCount" :total="adminUsersStore.users.length" />
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>
