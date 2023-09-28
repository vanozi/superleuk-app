<script setup lang="ts">
import {defineProps, inject, ref} from "vue";
import {IMedewerker, useMedewerkersStore} from "stores/admin/medewerkers-store";
import AppButton from "components/app/AppButton.vue";
import {storeToRefs} from "pinia";

const {roles} = storeToRefs(useMedewerkersStore())
const props = defineProps(['user', 'allRoles'])
const emits = defineEmits(['showAddRoleDialog', 'showRoleDeleteConfirmDialog'])
const user = inject('user') as IMedewerker
const columns = [{
  name: 'name',
  label: 'Naam',
  align: 'left',
  field: row => row.name,
  sortable: true
},
  {
    name: 'description',
    label: 'Omschrjving',
    align: 'left',
    field: row => row.description,
    sortable: true
  }]


</script>
<template>
  <q-list separator v-if="user.roles" class="q-mb-sm">
    <q-item v-for="role in user.roles" :key="role.id">
      <q-item-section>
        <q-item-label>{{ role.name }}</q-item-label>
        <q-item-label caption>{{ role.description }}</q-item-label>
      </q-item-section>
      <q-item-section side top>

        <q-btn flat round color="negative" icon="o_delete" @click="emits('showRoleDeleteConfirmDialog',role)"/>
      </q-item-section>
    </q-item>
    <q-item>
      <div class="fit row wrap justify-end items-start content-start">
        <AppButton v-if="roles.length != user.roles.length" color="warning" label="Rol toevoegen" outline
                   @click="emits('showAddRoleDialog')"/>
      </div>
    </q-item>
  </q-list>
</template>
