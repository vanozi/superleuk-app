
<script>
export default {
  name: 'DefaultLayout',
}
</script>

<script setup>
import { ref} from 'vue'
import { useQuasar } from "quasar";
import { storeToRefs} from 'pinia'
import {useUserStore} from 'src/stores/user-store'
import { useRouter } from "vue-router";
const { user } = storeToRefs(useUserStore());
const { logoutUser } = useUserStore();
const selectedLink = ref();
const leftDrawerOpen = ref(false)
const toggleLeftDrawer = function() {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }

const $q = useQuasar();
const router = useRouter();

function logout() {
  logoutUser(
    function () {
      router.push("/auth/login");
      $q.notify({
        color: "positive",
        textColor: "white",
        icon: "waving_hand",
        message: `Succesvol uitgelogd`,
      });
    },
  );
}

</script>


<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Superleuk App
        </q-toolbar-title>

        <q-btn v-if="user" flat outline @click="logout" >Logout</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>

      <q-list>
        <q-item-label header>
          Navigatie
        </q-item-label>
        <!-- <q-item clickable v-ripple to="/" :active="selectedLink === 'indexPage'" @click="selectedLink='indexPage'">
            <q-item-section class="text-left q-pl-md">Home</q-item-section>
          </q-item> -->
          <q-item clickable v-ripple to="/" :active="selectedLink === 'indexPagina'" @click="selectedLink='indexPagina'">
            <q-item-section top avatar>
              <q-avatar color="primary" text-color="white" icon="home" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Home</q-item-label>
            </q-item-section>
          </q-item>
        <q-expansion-item
        expand-separator
      >
      <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="build" color="secondary" text-color="white" />
          </q-item-section>

          <q-item-section>
            Werkplaats
          </q-item-section>
        </template>
        <q-list dense bordered>

          <q-item clickable v-ripple to="/werkplaats/machines" :active="selectedLink === 'machinelijst'" @click="selectedLink='machinelijst'">
            <q-item-section class="text-left q-pl-md">Machinelijst</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/werkplaats/storingen" :active="selectedLink === 'storingen'" @click="selectedLink='storingen'">
            <q-item-section class="text-left q-pl-md">Storingen</q-item-section>
          </q-item>
          <q-item clickable v-ripple  to="/werkplaats/tankoverzicht" :active="selectedLink === 'tankoverzicht'" @click="selectedLink='tankoverzicht'">
            <q-item-section class="text-left q-pl-md">Tankoverzicht</q-item-section>
          </q-item>
        </q-list>
        </q-expansion-item>
        <!-- <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" /> -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
