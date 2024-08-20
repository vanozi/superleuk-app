<script setup lang="ts">
import { z } from '~/utils/nl-zod'
import type { FormSubmitEvent } from '#ui/types'
import { useAuthStore } from '~/stores/auth-store'

const toast = useToast()

const authStore = useAuthStore()

const schema = z.object({
  email: z.string().email(),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(' henk')
  console.log(event.data)
  await authStore.forgotPassword(event.data.email, async function () { toast.add({ icon:'i-heroicons-check-badge',  title: 'Succes', description: 'Wachtwoord reset link verstuurd' }), await navigateTo('/auth/login') }, function (errorMessage:string) { toast.add({ icon:'i-heroicons-shield-exclamation', color:'red',  title: 'Fout', description: errorMessage }) })
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>
    <UButton block color="primary" variant="outline" type="submit">
      Verstuur
    </UButton>
  </UForm>
</template>
