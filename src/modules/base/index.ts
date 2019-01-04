import { Store } from 'vuex';

import base from '@/modules/base/store';
import * as Components from './components';

function plugin(Vue: any, { store }: { store: Store<any> }) {
  if (!store) {
    throw new Error('Please provide vuex store.');
  }
  store.registerModule('base', base);

  Vue.component('app-setup-modal', Components.appSetupModal);
}

if (typeof window !== 'undefined' && (window as any).Vue) {
  (window as any).Vue.use(plugin);
}

export default plugin;
