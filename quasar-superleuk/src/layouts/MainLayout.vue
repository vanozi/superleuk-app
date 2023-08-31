<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="accountStore.isLoggedIn"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <img style="height: 27px;" src="~assets/cow_logo_2.png">
        <q-toolbar-title>Superleuk</q-toolbar-title>


        <q-btn round color="primary" icon="o_account_circle"  v-if="accountStore.isLoggedIn">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section @click="logoutUser">Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      v-if="accountStore.isLoggedIn"
    >
      <q-item-label
        header
        style="
          color: white;
          background-color: #173e43;
          font-weight: bold;
          font-size: medium;
        "
      >Navigatie
      </q-item-label
      >
      <!-- Uren navigatie menu -->
      <q-expansion-item :header-class="{'expansion-header-style':currentRoute.includes('/uren')}">
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon name="schedule"/>
          </q-item-section>
          <q-item-section class="text-h6">Uren</q-item-section>
        </template>
        <template v-slot:default>
          <q-list dense class="q-pl-md text-body1">
            <q-item
              clickable
              v-ripple
              to="/uren/invoeren"
              :active="currentRoute === '/uren/invoeren'"
              active-class="navigation-item-selected"
            >
              <q-item-section avatar>
                <q-icon name="add_task"/>
              </q-item-section>
              <q-item-section>Invoeren</q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              to="/uren/overzicht"
              :active="currentRoute === '/uren/overzicht'"
              active-class="navigation-item-selected"
            >
              <q-item-section avatar>
                <q-icon name="list_alt"/>
              </q-item-section>
              <q-item-section>Overzicht</q-item-section>
            </q-item>
          </q-list>
        </template>
      </q-expansion-item>
      <!-- Werkplaats navigatie menu -->
<!--      <q-expansion-item>-->
<!--        <template v-slot:header>-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="o_build"/>-->
<!--          </q-item-section>-->

<!--          <q-item-section style="font-size: larger">Werkplaats</q-item-section>-->
<!--        </template>-->
<!--        <template v-slot:default>-->
<!--          <q-list dense class="q-pl-md">-->
<!--            <q-item-->
<!--              clickable-->
<!--              v-ripple-->
<!--              to="/werkplaats/machines"-->
<!--              :active="currentRoute === '/werkplaats/machines'"-->
<!--              active-class="navigation-item-selected"-->
<!--            >-->
<!--              <q-item-section avatar>-->
<!--                <q-icon name="o_agriculture"/>-->
<!--              </q-item-section>-->
<!--              <q-item-section>Machinelijst</q-item-section>-->
<!--            </q-item>-->
<!--            <q-item-->
<!--              clickable-->
<!--              v-ripple-->
<!--              to="/werkplaats/storingen"-->
<!--              :active="currentRoute === '/werkplaats/storingen'"-->
<!--              active-class="navigation-item-selected"-->
<!--            >-->
<!--              <q-item-section avatar>-->
<!--                <q-icon name="sym_o_warning"/>-->
<!--              </q-item-section>-->
<!--              <q-item-section>Storingen</q-item-section>-->
<!--            </q-item>-->
<!--            <q-item-->
<!--              clickable-->
<!--              v-ripple-->
<!--              to="/werkplaats/tankoverzicht"-->
<!--              :active="currentRoute === '/werkplaats/tankoverzicht'"-->
<!--              active-class="navigation-item-selected"-->
<!--            >-->
<!--              <q-item-section avatar>-->
<!--                <q-icon name="o_local_gas_station"/>-->
<!--              </q-item-section>-->
<!--              <q-item-section>Tankoverzicht</q-item-section>-->
<!--            </q-item>-->
<!--          </q-list>-->
<!--        </template>-->
<!--      </q-expansion-item>-->
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {useQuasar} from 'quasar';
import {ref, computed} from 'vue';
import {useAccountStore} from 'stores/account-store';
import {useRouter} from 'vue-router';

const $q = useQuasar();
const isDark = ref(false);

function toggleDarkMode() {
  $q.dark.toggle();
}

// stores initialization
const accountStore = useAccountStore();
const router = useRouter();
const currentRoute = computed(() => router.currentRoute.value.path);

const selectedLink = ref();
const active = ref(true);

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

<style>
.navigation-item-selected {
  color: #431B17 !important;
  font-weight: bolder !important;
  font-style: italic;
}

.expansion-header-style {
  background-color: #DDE3E4;
  font-style: italic;
}
</style>
