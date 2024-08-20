<script setup lang="ts">
import { z } from '~/utils/nl-zod'
import type { FormSubmitEvent } from '#ui/types'
import type { Body_auth_login } from '~/utils/client/types.gen'
import { useAuthStore } from '~/stores/auth-store'

const toast = useToast()

const authStore = useAuthStore()

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Wachtwoord is verplicht')
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const formData: Body_auth_login = {
    username: event.data.email,
    password: event.data.password
  }
  const data = { formData: formData }
  await authStore.login(data, async function () { toast.add({ icon:'i-heroicons-check-badge',  title: 'Succes', description: 'Je bent ingelogd' }), await navigateTo('/') }, function (errorMessage:string) { toast.add({ icon:'i-heroicons-shield-exclamation', color:'red',  title: 'Fout', description: errorMessage }) })
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>
    <UButton block color="primary" variant="outline" type="submit">
      Login
    </UButton>
  </UForm>
</template>
