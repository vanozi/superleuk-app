<script setup lang="ts">
import { z } from '~/utils/nl-zod'
import type { FormSubmitEvent } from '#ui/types'
import { useAuthStore } from '~/stores/auth-store'

const toast = useToast()

const authStore = useAuthStore()

const props = defineProps<{ token: string }>()

const schema = z
  .object({
    password: z.string(),
    herhaal_password: z.string(),
  })
  .refine((data) => data.password === data.herhaal_password, {
    path: ['herhaal_password'], // Error will be attached to the herhaal_password field
    message: 'Wachtwoorden komen niet overeen', // Custom error message
  })

type Schema = z.output<typeof schema>

const state = reactive({
  password: undefined,
  herhaal_password : undefined

})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await authStore.resetPassword( {password: event.data.password, token: props.token}, async function () { toast.add({ icon:'i-heroicons-check-badge',  title: 'Succes', description: 'Wachtwoord gereset' }), await navigateTo('/auth/login') }, function (errorMessage:string) { toast.add({ icon:'i-heroicons-shield-exclamation', color:'red',  title: 'Fout', description: errorMessage }) })
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Wachtwoord" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>
    <UFormGroup label="Herhaal wachtwoord" name="herhaal_password">
      <UInput v-model="state.herhaal_password" type="password" />
    </UFormGroup>
    <UButton block color="primary" variant="outline" type="submit">
      Verstuur
    </UButton>
  </UForm>
</template>
