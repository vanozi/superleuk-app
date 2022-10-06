<template>
  <IonApp>
    <ion-split-pane content-id="main-content" when="lg">
      <Menu v-if="logged_in_user!=null" />
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </IonApp>
</template>

<script>
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { defineComponent } from 'vue';
import Menu from './components/base/MenuComponent.vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'App',
  components: {
    Menu,
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
  },
  methods: {
    // async checkAccessToken() {
    //   const { value } = await Preferences.get({ key: 'accessToken' });
    //   if(value){
    //     return true
    //   }
    //   else {
    //     return false
    //   }
    // }
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

