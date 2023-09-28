<script setup lang="ts">
import FormBuilder from "src/forms/form-builder";
import ProfileForms from "src/forms/profile-forms";
import {defineProps, onMounted, ref, Ref, shallowRef, unref, watch} from "vue";
import {IAddress, IMedewerker} from "stores/admin/medewerkers-store";
import AppButton from "components/app/AppButton.vue";

const props = defineProps(['user'])
const emits = defineEmits(['updateAddress'])
const address: IAddress = ref(Object.assign({}, props.user.address[0]));
const readonly = ref(true)

function saveChanges() {
  emits('updateAddress', unref(address))
  readonly.value = true
}
</script>
<template>
  <div class="q-ma-md">
    <q-form>
      <q-input
          v-model="address.street"
          label="Straat"
          lazy-rules
          :readonly="readonly"
      />
      <q-input
          v-model="address.number"
          label="Huisnnummer"
          lazy-rules
          :readonly="readonly"
      />
      <q-input
          v-model="address.postal_code"
          label="Postcode"
          lazy-rules
          :readonly="readonly"
      />
      <q-input
          v-model="address.country"
          label="Land"
          lazy-rules
          :readonly="readonly"
      />
    </q-form>
    <div class="q-my-sm fit row wrap justify-end items-start content-start">
      <AppButton color="warning" label="Wijzig" outline v-if="readonly" @click="readonly = false"/>
      <AppButton color="secondary" label="Opslaan" outline v-if="!readonly" @click="saveChanges"/>
    </div>
  </div>
</template>
