<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Superleuk App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>

      <q-list>
        <q-item-label header>
          Navigatie
        </q-item-label>
        <q-expansion-item
        expand-separator
        icon="build"
        label="Werkplaats"
      >
        <q-list dense bordered>

          <q-item clickable v-ripple to="/werkplaats/machines" :active="selectedLink === 'machinelijst'" @click="selectedLink='machinelijst'">
            <q-item-section>Machinelijst</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>Onderhoud</q-item-section>
          </q-item>
          <q-item clickable v-ripple  to="/werkplaats/tankoverzicht" :active="selectedLink === 'tankoverzicht'" @click="selectedLink='tankoverzicht'">
            <q-item-section>Tankoverzicht</q-item-section>
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

<script>
import { defineComponent, ref } from 'vue'
// import EssentialLink from 'components/EssentialLink.vue'



const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'build',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    // EssentialLink
  },

  setup() {
    const selectedLink = ref();
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      selectedLink,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
