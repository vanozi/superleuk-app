<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Gebroeders Vroege </q-toolbar-title>

        <q-btn
          v-if="accountStore.isLoggedIn"
          outline
          icon="logout"
          label="Logout"
          @click="logoutUser"
          :size="$q.screen.lt.md ? 'xs' : ''"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Navigatie Links </q-item-label>
        <q-expansion-item expand-separator>
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon name="agriculture" />
            </q-item-section>
            <q-item-section> Werkplaats </q-item-section>
          </template>
          <q-list dense bordered>
            <q-item
              clickable
              v-ripple
              to="/werkplaats/machines"
              :active="selectedLink === 'machinelijst'"
              @click="selectedLink = 'machinelijst'"
            >
              <q-item-section class="text-left q-pl-md"
                >Machinelijst</q-item-section
              >
            </q-item>
            <q-item
              clickable
              v-ripple
              to="/werkplaats/storingen"
              :active="selectedLink === 'storingen'"
              @click="selectedLink = 'storingen'"
            >
              <q-item-section class="text-left q-pl-md"
                >Storingen</q-item-section
              >
            </q-item>
            <q-item
              clickable
              v-ripple
              to="/werkplaats/tankoverzicht"
              :active="selectedLink === 'tankoverzicht'"
              @click="selectedLink = 'tankoverzicht'"
            >
              <q-item-section class="text-left q-pl-md"
                >Tankoverzicht</q-item-section
              >
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

<script setup lang="ts">
import { ref } from 'vue';
import { useAccountStore } from 'stores/account-store';
import { useRouter } from 'vue-router';

// stores initialization
const accountStore = useAccountStore();
const router = useRouter();

const selectedLink = ref();

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function logoutUser() {
  accountStore.logoutUser(function () {
    router.push('/auth/login');
  });
}
</script>
