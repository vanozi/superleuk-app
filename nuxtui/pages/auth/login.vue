<template>
  <UContainer class="flex flex-col justify-center h-screen max-w-sm">
    <UCard>
      <HorizontalNavigationLinksAuth />
      <UDashboardSection
        icon="i-lets-icons-sign-in-squre-light"
        title="Login"
        description="Vul je e-mailadres en wachtwoord in om in te loggen"
        orientation="vertical"
        class="mt-4"
      />
      <AuthLoginForm />
      <ULink to="/auth/forgot-password" class="text-left text-sm block mt-4">
        Wachtwoord vergeten?
      </ULink>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
