<script setup lang="ts">
import FormBuilder from "src/forms/form-builder";
import ProfileForms from "src/forms/profile-forms";
import {defineProps, onMounted, ref, Ref, shallowRef, unref, watch} from "vue";
import {IMedewerker} from "stores/admin/medewerkers-store";
import AppButton from "components/app/AppButton.vue";

const props = defineProps(['user'])
const emits = defineEmits(['updateProfile'])
const medewerker: IMedewerker = ref(Object.assign({}, props.user));
const readonly = ref(true)

function saveChanges() {
  emits('updateProfile', unref(medewerker))
  readonly.value = true
}
</script>
<template>
  <div class="q-ma-md">
    <q-form>
      <q-input
        v-model="medewerker.first_name"
        label="Voornaam *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Voornaam is verplicht']"
        :readonly="readonly"
      />
      <q-input
        v-model="medewerker.last_name"
        label="Achternaam *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Voornaam is verplicht']"
        :readonly="readonly"
      />
      <q-input
        v-model="medewerker.email"
        label="Email *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Voornaam is verplicht']"
        :readonly="readonly"
      />
    </q-form>
    <div class="fit row wrap justify-end items-start content-start">
      <AppButton color="warning" label="Wijzig" outline v-if="readonly" @click="readonly = false"/>
      <AppButton color="secondary" label="Opslaan" outline v-if="!readonly" @click="saveChanges"/>
    </div>

  </div>
</template>
