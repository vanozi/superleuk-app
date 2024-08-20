<template>
  <UContainer class="flex flex-col justify-center h-screen max-w-sm">
    <UCard>
      <UDashboardSection
        icon="i-heroicons-question-mark-circle"
        title="Wachtwoord vergeten"
        description="Vraag een link aan om je wachtwoord te resetten"
        orientation="vertical"
      />
      <AuthForgotPasswordForm />
      <ULink to="/auth/login" class="text-left text-sm block mt-4">
        Terug naar login scherm
      </ULink>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
