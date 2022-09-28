import { createApp } from 'vue'
import App from './App.vue'
import BaseLayout from './components/base/BaseLayout.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

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

/* Theme variables */
import './theme/variables.css';
import './theme/core.css';

// Imports for 1st time app start
import { Device } from '@capacitor/device'

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store)
  .use(VueAxios, axios);
  
app.component('base-layout', BaseLayout)

router.isReady().then(async () => {
  const info = await Device.getInfo();
  const id = await Device.getId();
  const deviceId = info.platform + info.model + id.uuid;
  console.log(deviceId)
  app.mount('#app');
});