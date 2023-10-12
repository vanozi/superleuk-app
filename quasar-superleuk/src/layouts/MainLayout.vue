<template>

  <q-layout view="hHh Lpr lff">
    <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-primary'">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round icon="menu"/>
        <img style="height: 27px;" src="~assets/cow_logo_2.png">
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

    <q-drawer
        v-model="drawer"
        :width="200"
        :breakpoint="500"
        overlay
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <q-list v-if="accountStore.hasUserRole('werknemer')" dense>
          <q-item>
            <q-item-section>
              <q-item-label overline>Medewerker</q-item-label>
            </q-item-section>
          </q-item>
          <template v-for="(menuItem, index) in menuListWerknemer" :key="index">
            <q-item clickable v-ripple :to="menuItem.to">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon"/>
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
                <q-icon :name="menuItem.icon"/>
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
            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon"/>
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
        <router-view/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useAccountStore} from "stores/account-store";
import {useRouter} from "vue-router";

const accountStore = useAccountStore();
const router = useRouter();

const drawer = ref(false)
const menuListWerknemer = [
  {
    icon: 'o_more_time',
    label: 'Uren',
    to: '/uren/'
  },
  {
    icon: 'o_list_alt',
    label: 'Werkbonnen',
  }
]
const menuListMonteur = [{
  icon: 'o_agriculture',
  label: 'Werkplaats',
}]
const menuListAdmin = [{
  icon: 'o_group',
  label: 'Account beheer',
},
  {
    icon: 'o_bolt',
    label: 'Energy',
  },
  {
    icon: 'o_savings',
    label: 'Moneybird',
  }]

async function logoutUser() {
  await accountStore.logoutUser(function () {
    router.push('/auth/login');
  });
}

</script>
