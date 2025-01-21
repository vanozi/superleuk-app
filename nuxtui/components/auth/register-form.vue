<script setup lang="ts">
import { z } from '~/utils/nl-zod'
import type { FormSubmitEvent } from '#ui/types'
import { useAuthStore } from '~/stores/auth-store'

const toast = useToast()

const authStore = useAuthStore()

const schema = z.object({
  first_name: z.string().min(1, 'Voornaam is verplicht'),
  last_name: z.string().min(1, 'Achternaam is verplicht'),
  email: z.string().email().transform((val) => val.toLowerCase()), // Convert email to lowercase
  password: z.string().min(6, 'Wachtwoord moet minimaal 6 karakters lang zijn'), // You can use SecretStr as a string with password validation rules
  herhaal_password: z.string(),
}).refine((data) => data.password === data.herhaal_password, {
    path: ['herhaal_password'], // Error will be attached to the herhaal_password field
    message: 'Wachtwoorden komen niet overeen', // Custom error message
  })



type Schema = z.output<typeof schema>

  const state = reactive({
  first_name: undefined,
  last_name: undefined,
  email: undefined,
  password: undefined,
  herhaal_password : undefined

})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await authStore.register(event.data, async function (successMessage : string) { toast.add({ icon:'i-heroicons-check-badge',  title: 'Succes', description: successMessage}), await navigateTo('/') }, function (errorMessage:string) { toast.add({ icon:'i-heroicons-shield-exclamation', color:'red',  title: 'Fout', description: errorMessage }) })
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Voornaam" name="first_name">
      <UInput v-model="state.first_name" />
    </UFormGroup>

    <UFormGroup label="Achternaam" name="last_name">
      <UInput v-model="state.last_name" />
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Wachtwoord" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>
    <UFormGroup label="Herhaal wachtwoord" name="herhaal_password">
      <UInput v-model="state.herhaal_password" type="password" />
    </UFormGroup>
    <UButton block color="primary" variant="outline" type="submit">
      Registeren
    </UButton>
  </UForm>
</template>
