<template>
  <q-dialog>
    <q-card class="q-dialog-plugin">
      <q-toolbar class="bg-secondary text-white">
        <q-btn flat round dense icon="add"/>
        <q-toolbar-title :style="$q.screen.lt.md ? {'font-size': '18px'} : {}">
          Rol Toevoegen
        </q-toolbar-title>

        <q-btn flat round dense icon="close" @click="emits('closeDialog')"/>
      </q-toolbar>
      <q-card-section>
        <q-select v-model="roleSelected" :options="newRoles" label="Selecteer rol"/>
      </q-card-section>

      <q-card-actions align="right">
        <AppButton v-if="roleSelected" outline color="positive" label="OK" @click="emits('addRole', roleSelected)"/>
        <AppButton outline color="negative" label="Cancel" @click="emits('closeDialog')"/>
      </q-card-actions>
    </q-card>

  </q-dialog>
</template>

<script setup lang="ts">
import {computed, PropType, ref, inject} from "vue";
import {IRole, useMedewerkersStore} from "stores/admin/medewerkers-store";
import AppButton from "components/app/AppButton.vue";

const user_id = inject('user_id') as number
const props = defineProps({
  roles: {
    type: Array as PropType<IRole[]>,
    required: true
  },
  currentRoles: {
    type: Array as PropType<IRole[]>,
    required: true
  }
})

const roleSelected = ref<string>()
const emits = defineEmits(['closeDialog', 'addRole'])
const medewerkersStore = useMedewerkersStore()

const newRoles = computed(() => {
  const roleNames = props.roles.map(role => role.name);
  const currentRoleNames = props.currentRoles.map(role => role.name);
  // Filter and return role names that are in roles but not in currentRoles
  return roleNames.filter(roleName => !currentRoleNames.includes(roleName));
});



</script>
