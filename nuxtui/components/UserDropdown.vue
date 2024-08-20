<script setup lang="ts">
import { useAuthStore } from '~/stores/auth-store'

const authStore = useAuthStore()
const toast = useToast()


const items = computed(() => [  [{
    slot: 'account',
    label: '',
    disabled: true
  }], [{

    label: 'Profiel',
    icon: 'i-heroicons-cog-8-tooth',
    to: '/settings'
  }], [{
    label: 'Uitloggen',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: async() => await authStore.logout(async function () { toast.add({ icon:'i-heroicons-check-badge',  title: 'Succes', description: 'Je bent uitgelogd' }), await navigateTo('/auth/login') }, function (errorMessage:string) { toast.add({ icon:'i-heroicons-shield-exclamation', color:'red',  title: 'Fout', description: errorMessage }) })
  }]
])
</script>

<template>
  <UDropdown mode="click" :items="items" :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }" :popper="{ strategy: 'absolute', placement: 'top' }" class="w-full">
    <template #default="{ open }">
      <UButton color="gray" variant="ghost" class="w-full" :label="authStore.loggedInUser.first_name" :class="[open && 'bg-gray-50 dark:bg-gray-800']">
        <template #leading>
          <UIcon name="i-heroicons-user" size="2xs" />
        </template>

        <template #trailing>
          <UIcon name="i-heroicons-ellipsis-vertical" class="w-5 h-5 ml-auto" />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="text-left">
        <p>
          Ingelogd als
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ authStore.loggedInUser.email }}
        </p>
      </div>
    </template>
  </UDropdown>
</template>
