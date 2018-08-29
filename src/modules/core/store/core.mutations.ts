import { cloneDeep } from 'lodash';

import MUTATIONS from '../constants/mutations.constant';
import { CoreStateModel } from '../models/core-state.model';
import { CoreLanguageModel } from '../models/core-language.model';

export default {
  [MUTATIONS.SET_CURRENT_LANGUAGE](state: CoreStateModel, language: CoreLanguageModel) {
    state.currentLanguage = language;
  },

  [MUTATIONS.LAYOUT.SET_SIDEBAR_TITLE](state: CoreStateModel, sidebarTitle: string) {
    state.appLayout = {
      ...state.appLayout,
      sidebarTitle
    };
  },

  [MUTATIONS.LAYOUT.SET_TOOLBAR_TITLE](state: CoreStateModel, toolbarTitle: string) {
    state.appLayout = {
      ...state.appLayout,
      toolbarTitle
    };
  },

  [MUTATIONS.LAYOUT.SET_ICON](state: CoreStateModel, icon: string) {
    state.appLayout = {
      ...state.appLayout,
      icon
    };
  },

  [MUTATIONS.LAYOUT.SET_LEFT_DRAWER](state: CoreStateModel, leftDrawer: boolean) {
    if (state.appLayout.leftDrawer !== leftDrawer) {
      state.appLayout = {
        ...state.appLayout,
        leftDrawer
      };
    }
  },

  [MUTATIONS.LAYOUT.SET_LEFT_DRAWER_CLIPPED](state: CoreStateModel, leftDrawerClipped: boolean) {
    state.appLayout = {
      ...state.appLayout,
      leftDrawerClipped
    };
  },

  [MUTATIONS.LAYOUT.SET_LEFT_DRAWER_MINI](state: CoreStateModel, leftDrawerMini: boolean) {
    state.appLayout = {
      ...state.appLayout,
      leftDrawerMini
    };
  },

  [MUTATIONS.LAYOUT.SET_LEFT_DRAWER_FLOATING](state: CoreStateModel, leftDrawerFloating: boolean) {
    state.appLayout = {
      ...state.appLayout,
      leftDrawerFloating
    };
  }
};
