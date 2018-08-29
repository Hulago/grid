import 'vuetify/dist/vuetify.min.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import LANGUAGES from './constants/language.constant';

import { vCore, coreI18n } from './modules/core';

import Vuetify from 'vuetify';
Vue.use(Vuetify, {
  theme: {
    primary: '#7f87cf',
    secondary: '#c0c7ec',
    accent: '#dfe0e6',
    error: '#b71c1c'
  }
});

Vue.use(vCore as any, {
  store
});

Vue.config.productionTip = false;

Vue.directive('dsd');

new Vue({
  router,
  store,
  i18n: coreI18n(LANGUAGES),
  render: h => h(App)
}).$mount('#app');
