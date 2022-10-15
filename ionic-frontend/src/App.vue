<template>
  <IonApp>
    <ion-split-pane when="lg">
      <Menu v-if="logged_in_user!=null" />
      <router-view></router-view>
    </ion-split-pane>
  </IonApp>
</template>

<script>
import { IonApp, IonSplitPane } from '@ionic/vue';
import { defineComponent } from 'vue';
import Menu from './components/base/MenuComponent.vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'App',
  components: {
    Menu,
    IonApp,
    IonSplitPane,
  },
  data() {
        return {
        }
    },
  methods: {

  },
  computed: {
        ...mapGetters({
            access_token: 'auth/accessToken',
            logged_in_user : 'auth/loggedInUser'
        })
    },


});
</script>

<style scoped>
ion-split-pane {
  --side-max-width: 300px;
}
</style>>

