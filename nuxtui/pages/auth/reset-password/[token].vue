<template>
  <UContainer class="flex flex-col justify-center h-screen max-w-sm">
    <UCard>
      <UDashboardSection
        icon="i-ri-reset-left-line"
        title="Wachtwoord resetten"
        description="Voer een nieuw wachtwoord in"
        orientation="vertical"
      />
      <AuthResetPasswordForm :token="token" />
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const token = route.params.token as string
</script>

<style scoped></style>
