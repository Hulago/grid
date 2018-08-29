import Vue from 'vue';
import VueI18n from 'vue-i18n';

import { merge } from 'lodash';

// import * as Components from '@core/components';
import * as Directives from './directives';
import * as Filters from './filters';
import * as Services from './services';
// import * as Views from '@core/views';

import TYPES from './constants/types.constant';
import LANGUAGES from './constants/language.constant';

import { CoreMixin } from './mixins/core.mixin';

import core from './store';

const vCore = {
  install(V: typeof Vue, { store }: { store: any }) {
    if (!store) {
      throw new Error('Please provide vuex store.');
    }

    store.registerModule('core', core);
    // store.commit(`core/${MUTATIONS.SET_CONFIG}`, config);

    V.directive('fc', Directives.fc);
    V.directive('tc', Directives.tc);
    V.directive('tu', Directives.tu);
    V.directive('fl', Directives.tl);
    V.directive('fp', Directives.tp);

    V.filter('capitalize', Filters.capitalize);
    V.filter('lowerCase', Filters.lowerCase);
    V.filter('upperCase', Filters.upperCase);
    V.filter('truncate', Filters.truncate);
    V.filter('get', Filters.get);
    V.filter('toString', Filters.toString);
    V.filter('toDate', Filters.toDate);
    V.filter('toDateTime', Filters.toDateTime);
    V.filter('bytes', Filters.bytes);

    const storageService: Services.StorageService = Services.di.get<Services.StorageService>(TYPES.StorageService);

    // TODO set this on the app config
    storageService.setup('CORE');

    // View App Layouts
    V.mixin(CoreMixin);

    // router.beforeEach(authService.validate(config.auth.authAction));

    // router.addRoutes([
    //   {
    //     path: '/core',
    //     name: 'Core',
    //     component: Views.CoreAppLayout2View,
    //     children: [
    //       {
    //         path: 'console',
    //         name: 'Core:Console',
    //         component: Views.CoreConsoleView
    //       }
    //     ]
    //   },
    //   {
    //     path: '*',
    //     component: {
    //       template: `<core-page-not-found :hslColor="${config.hsl404Color ? config.hsl404Color : 241}" msg="${
    //         config.msg404 ? config.msg404 : '404 Dude, I think you are lost'
    //       }"></core-page-not-found>`
    //     }
    //   }
    // ]);

    // Vue.component('core-app-layout-1', Views.CoreAppLayout1View);
    // Vue.component('core-app-layout-2', Views.CoreAppLayout2View);
    // Vue.component('core-view-layout-1', Views.CoreViewLayout1View);
    // Vue.component('core-page-not-found', Views.CorePageNotFoundView);
    // Vue.component('core-page-forbidden', Views.CorePageForbiddenView);
  }
};

if (typeof window !== 'undefined' && (window as any).Vue) {
  (window as any).Vue.use(vCore);
}

export { vCore };

export function coreI18n(messages: any, numberFormatsConfig: any = null) {
  const numberFormats = {
    'en-US': {
      euro: {
        style: 'currency',
        currency: 'EUR'
      },
      dollar: {
        style: 'currency',
        currency: 'USD'
      }
    },
    'pt-PT': {
      euro: {
        style: 'currency',
        currency: 'EUR'
      },
      dollar: {
        style: 'currency',
        currency: 'USD'
      }
    },
    ...numberFormatsConfig
  };
  Vue.use(VueI18n);
  return new VueI18n({
    numberFormats,
    locale: 'en-US',
    fallbackLocale: 'en-US',
    messages: merge(LANGUAGES, messages)
  });
}
