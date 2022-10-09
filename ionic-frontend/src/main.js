import { createApp } from 'vue'
import App from './App.vue'
import BaseLayout from './components/base/BaseLayout.vue'
import router from './router'
import store from './store'

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

// icons
import { addIcons } from 'ionicons';
import { homeOutline, timeOutline, logOutOutline } from 'ionicons/icons';


// vue date-picker
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

addIcons({
  homeoutline: homeOutline,
  timeoutline : timeOutline,
  logoutoutline : logOutOutline
  
});

/* Theme variables */
import './theme/variables.css';
import './theme/core.css';

// Imports for 1st time app start
import { Device } from '@capacitor/device'
import { Preferences } from '@capacitor/preferences';
import api from './api';


const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store);

app.component('base-layout', BaseLayout)
app.component('date-picker', Datepicker);

// methodes voor access tokens 
const setAccessToken = async (accessToken) => {
  await Preferences.set({
    key: 'accessToken',
    value: accessToken,
  });
};

const removeAccessToken = async () => {
  await Preferences.remove({ key: 'accessToken' });
};

router.isReady().then(async () => {
  const info = await Device.getInfo();
  const id = await Device.getId();
  const deviceId = info.platform + info.model + id.uuid;
  let accessToken = '';
  store.commit('auth/SET_LOGGED_IN_DEVICE_ID', deviceId);
  // Check device id status, als ingelogd dan access token zetten en doorsturen naar homepagina
  // anders doorsturen naar login pagina
  await api.get('/ionic/device_id_status', { params: { device_id: deviceId } })
    .then(async resp => {
      accessToken = resp.data["access_token"]
      setAccessToken(resp.data["access_token"]);
      // als de user ingelogd was en een nieuwe token is gegenereerd dan de user info opvragen en ook opslaan in de store
      await api.get('/users/me', {
        headers: {
          Authorization: 'Bearer ' + accessToken // the token is a variable which holds the token
        }
      }).then(resp => {
        // als de user info succesvol is opgehaald dan de gegevens opslaag in de store en door sturen naar de home pagina
        store.commit('auth/SET_ACCESS_TOKEN', accessToken);
        store.commit('auth/SET_LOGGED_IN_USER', resp.data);
        router.push('/home')
      }).catch(() => {
        // als er iets mis is gegaan de auth store legen en doorverwijzen naar de auth pagina om in te loggen
        store.commit('auth/DELETE_ACCESS_TOKEN');
        store.commit('auth/DELETE_LOGGED_IN_USER');
        router.push('/auth')
      })
    })
    .catch((err) => {
      if (err.response.status == 401 || err.response.status == 404) {
        removeAccessToken();
        router.push('/auth')
      }
    },
      // sla access token samen met de user info op in de store

    )


  // Zo ja, dan bevat de response een jwt token die opgeslagen kan worden in de local storag

  // Zo niet, dan de gebruiker doorverwijzen naar de login pagina



  app.mount('#app');
});