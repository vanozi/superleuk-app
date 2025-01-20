<script setup lang="ts">
const teams = [{
  label: 'Nuxt',
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/23360933?s=200&v=4'
  },
  click: () => {
    team.value = teams[0]
  }
}, {
  label: 'NuxtLabs',
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/62017400?s=200&v=4'
  },
  click: () => {
    team.value = teams[1]
  }
}]


const team = ref(teams[0])
</script>

<template>
  <UButton color="gray" variant="ghost" :class="'bg-gray-50 dark:bg-gray-800'" class="w-full">
    <UAvatar src="https://avatars.githubusercontent.com/u/23360933?s=200&v=4" size="2xs" />

    <span class="truncate text-gray-900 dark:text-white font-semibold">{{ team.label }}</span>
  </UButton>
</template>
