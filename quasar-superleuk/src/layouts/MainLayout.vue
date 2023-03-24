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
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import { useAccountStore } from 'stores/account-store';
import { useRouter } from 'vue-router';

// stores initialization
const accountStore = useAccountStore();
const router = useRouter();

const selectedLink = ref();

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Werkplaats',
    // caption: 'quasar.dev',
    icon: 'agriculture',
    link: '/werkplaats',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

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
