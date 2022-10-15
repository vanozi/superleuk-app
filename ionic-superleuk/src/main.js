import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
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
import { add, homeOutline, timeOutline, trashOutline, logOutOutline, createOutline,reorderThreeOutline, pencilOutline, personCircleOutline, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';

addIcons({
  homeoutline: homeOutline,
  timeoutline : timeOutline,
  logoutoutline : logOutOutline,
  reorderthreeoutline :reorderThreeOutline,
  penciloutline: pencilOutline,
  personcircleoutline : personCircleOutline,
  chevronbackoutline : chevronBackOutline,
  chevronforwardoutline:chevronForwardOutline,
  add:add,
  createoutline:createOutline,
  trashoutline:trashOutline
});

// Vue datepicker
// vue date-picker
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

//api
import api from './api';

// momentjs
import moment from 'moment';
moment.locale('nl');

/* Theme variables */
import './theme/variables.css';

import BaseView from './components/layouts/BaseView.vue';

// naive ui
import {
  // create naive ui
  create,
  // component
  NButton, NDataTable, NIcon, NTag, NForm, NFormItem, NInput, NMessageProvider, NSpace
} from 'naive-ui'

const naive = create({
  components: [NButton, NDataTable, NIcon, NTag, NForm, NFormItem, NInput, NMessageProvider, NSpace]
})
const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(naive)
  .use(store);

  // global config
app.provide('globalMoment', moment)


app.component('BaseView', BaseView);
app.component('date-picker', Datepicker);


// imports nodig voor het checken van ingelogd status voor openen app
import { Device } from '@capacitor/device'

router.isReady().then(async () => {
  // voor het openen van de app checken of device id is ingelogd
  const info = await Device.getInfo();
  const id = await Device.getId();
  const deviceId = info.platform + info.model + id.uuid;
  console.log(deviceId)

  await api.get('/ionic/device_id_status', { params: { device_id: deviceId } })
    .then(async resp => {console.log(resp.content)}).catch(() => {router.push('/home')})

  app.mount('#app');
});