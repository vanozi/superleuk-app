<template>
  <UContainer class="flex flex-col justify-center h-screen max-w-sm">
    <UCard>
      <HorizontalNavigationLinksAuth />
      <UDashboardSection
        icon="i-clarity-assign-user-line"
        title="Registreren"
        description="Vul je gegevens in om je te registreren"
        orientation="vertical"
        class="mt-4"
      />
      <AuthRegisterForm />
      <ULink to="/auth/login" class="text-left text-sm block mt-4">
        Terug naar login scherm
      </ULink>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
