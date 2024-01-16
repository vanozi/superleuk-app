<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-primary'">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round icon="menu" v-if="useAccountStore().isLoggedIn" />
        <router-link to="/">
          <img style="height: 27px" src="~assets/cow_logo_2.png" />
        </router-link>

        <q-toolbar-title>Superleuk</q-toolbar-title>
        <q-btn round color="primary" icon="o_account_circle" v-if="useAccountStore().isLoggedIn">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section @click="logoutUser()">Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" :width="200" :breakpoint="500" overlay bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
      <q-scroll-area class="fit">
        <!-- Uren -->
        <q-list dense class="q-mt-sm">
          <q-item>
            <q-item-section>
              <q-item-label overline>NAVIGATIE</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced />
          <q-item v-if="shouldRenderUren">
            <q-item-section>
              <q-item-label overline>Uren</q-item-label>
            </q-item-section>
          </q-item>
          <template v-for="(menuItem, index) in menuListUren" :key="index">
            <q-item clickable v-ripple :to="menuItem.to" v-if="useAccountStore().hasUserRole(menuItem.role)">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>

        <q-list v-if="useAccountStore().hasUserRole('monteur')" dense>
          <q-item>
            <q-item-section>
              <q-item-label overline>Monteur</q-item-label>
            </q-item-section>
          </q-item>

          <template v-for="(menuItem, index) in menuListMonteur" :key="index">
            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
        <q-list v-if="useAccountStore().hasUserRole('admin')" dense>
          <q-item>
            <q-item-section>
              <q-item-label overline>Admin</q-item-label>
            </q-item-section>
          </q-item>

          <template v-for="(menuItem, index) in menuListAdmin" :key="index">
            <q-item clickable v-ripple :to="menuItem.to">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAccountStore } from 'stores/account-store';
import { useRouter } from 'vue-router';

const accountStore = useAccountStore();
const router = useRouter();

const drawer = ref(false);

const menuListUren = [
  {
    icon: 'o_more_time',
    label: 'Uren',
    to: '/uren/',
    role: 'werknemer'
  },
  {
    icon: 'o_luggage',
    label: 'Vakanties',
    to: '/vakanties/',
    role: 'werknemer'
  },

];

const shouldRenderUren = computed(() => {
  // Check if any items in menuListUren should be rendered
  for (const menuItem of menuListUren) {
    if (useAccountStore().hasUserRole(menuItem.role)) {
      return true; // At least one item should be rendered
    }
  }
  return false; // No items should be rendered
});

const menuListMonteur = [
  {
    icon: 'o_agriculture',
    label: 'Werkplaats',
  },
];
const menuListAdmin = [
  {
    icon: 'o_group',
    label: 'Account beheer',
    to: '/admin/medewerkers/',
  },
  {
    icon: 'o_more_time',
    label: 'Uren',
    to: '/admin/uren/',
  },
  // {
  //   icon: 'o_bolt',
  //   label: 'Energy',
  // },
  // {
  //   icon: 'o_savings',
  //   label: 'Moneybird',
  // },
  // {
  //   icon: 'o_calendar_today',
  //   label: 'Boederij kalender',
  //   to: '/boerderij-kalender/',
  // },
];


async function logoutUser() {
  await accountStore.logoutUser(function () {
    router.push('/auth/login');
  });
}
</script>
