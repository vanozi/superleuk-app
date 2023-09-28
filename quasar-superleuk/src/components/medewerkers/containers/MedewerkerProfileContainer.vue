<script setup lang="ts">
import {computed, ComputedRef, onBeforeMount, provide, Ref, ref} from "vue";
import {IAddress, IMedewerker, IRole, useMedewerkersStore} from "stores/admin/medewerkers-store";
import PProfileGeneralInfoForm from "components/medewerkers/presentational/PProfileGeneralInfoForm.vue";
import {router} from "src/router";
import PProfileAddress from "components/medewerkers/presentational/PProfileAddress.vue";
import PProfileRoles from "components/medewerkers/presentational/PProfileRoles.vue";
import {storeToRefs} from "pinia";
import ChooseRolesDialog from "components/medewerkers/presentational/ChooseRolesDialog.vue";
import AppConfirmDialog from "components/app/AppConfirmDialog.vue";

const medewerkersStore = useMedewerkersStore();
const {getUserById} = storeToRefs(medewerkersStore);

onBeforeMount(() => {
  medewerkersStore.fetchAllRoles();
})
const addRoleDialog = ref(false)
const user_id: number = parseInt(router.currentRoute.value.params.id as string)
provide('user_id', user_id)
const user: Ref<IMedewerker | undefined> = ref(getUserById.value(user_id))
provide('user', user)
const currentRoles: ComputedRef<IRole[]> = computed(() => {
  return user.value?.roles || []
})
const roleDeleteConfirmDialog = ref(false)
const roleToDelete = ref<IRole>()

const generalInfoExpanded = ref(false)
const addressInfoExpanded = ref(false)
const rolesInfoExpanded = ref(false)

function showRoleDeleteConfirmDialog(role: IRole) {
  // either call show here or in your template using the below myDialog.show()
  roleToDelete.value = role
  roleDeleteConfirmDialog.value = true
}

async function updateProfile(medewerker: IMedewerker) {
  await medewerkersStore.updateMedewerker(medewerker);
  user.value = getUserById.value(user_id)
}

async function updateAddress(address: IAddress) {
  await medewerkersStore.updateAddress(address, user_id);
  user.value = getUserById.value(user_id)
}

async function addRole(roleName: string) {
  // based on roleSelected get the corresponding role from props.roles and add it to the user
  const role = medewerkersStore.roles.find(role => role.name === roleName)
  if (role) {
    await medewerkersStore.addUserRole(user_id, role.id)
    addRoleDialog.value = false;
    user.value = getUserById.value(user_id)
  }
}

async function deleteUserRole() {
  if (roleToDelete.value) {
    await medewerkersStore.deleteUserRole(user_id, roleToDelete.value.id)
    roleDeleteConfirmDialog.value = false
    user.value = getUserById.value(user_id)
  }
}

</script>
<template>
  <div v-if="user!=undefined">
    <div class="text-subtitle1">
      {{ user.first_name }} {{ user.last_name }}
    </div>
  </div>
  <q-list bordered separator>
    <!--  algemene gegevens -->
    <q-expansion-item
        v-model="generalInfoExpanded"
        icon="perm_identity"
        label="Algemene gegevens"
        header-class="bg-grey-2 "
    >
      <PProfileGeneralInfoForm v-if="user!=undefined" :user="user" @update-profile="updateProfile" />
    </q-expansion-item>
    <!--  adres -->
    <q-expansion-item
        v-model="addressInfoExpanded"
        icon="o_home"
        label="Adres gegevens"
        header-class="bg-grey-2"
    >
      <PProfileAddress v-if="user!=undefined" :user="user" @update-address="updateAddress" />
    </q-expansion-item>
    <!--  rollen -->
    <q-expansion-item
        v-model="rolesInfoExpanded"
        icon="o_vpn_key"
        label="Rollen"
        header-class="bg-grey-2"
    >
      <PProfileRoles v-if="user!=undefined" :user="user" :all-roles="medewerkersStore.roles"
                     @show-add-role-dialog="addRoleDialog=true"
                     @show-role-delete-confirm-dialog="showRoleDeleteConfirmDialog"/>
      <!-- AddRoleDialog -->
      <ChooseRolesDialog :current-roles="currentRoles" :roles="medewerkersStore.roles" ref="chooseRolesDialog"
                         v-model="addRoleDialog" @add-role="addRole" @close-dialog="addRoleDialog=false"/>
      <!-- ConfirmDeleteRoleDialog -->
      <!--  The confirm dialog -->
      <AppConfirmDialog ref="confirmRoleDeleteDialog" v-model="roleDeleteConfirmDialog"
                        @confirm="deleteUserRole">
        <q-toolbar class="bg-secondary text-white">
          <q-btn flat round dense icon="o_delete"/>
          <q-toolbar-title :style="$q.screen.lt.md ? {'font-size': '18px'} : {}">
            Rol verwijderen
          </q-toolbar-title>

          <q-btn flat round dense icon="close" @click="roleDeleteConfirmDialog=false"/>
        </q-toolbar>
        <q-card-section>
          Wil je de rol {{ roleToDelete.name }} verwijderen?
        </q-card-section>
      </AppConfirmDialog>
    </q-expansion-item>
  </q-list>
</template>
