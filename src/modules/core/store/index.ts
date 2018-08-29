import mutations from './core.mutations';
// import actions from './core.actions';
// import getters from './core.getters';
import { CoreStateModel } from '../models/core-state.model';
import { CoreAppLayoutModel } from '../models/core-app-layout.model';
import { CoreLanguageModel } from '../models/core-language.model';

export const emptyState = () => {
  return new CoreStateModel({
    currentLanguage: new CoreLanguageModel(),
    appLayout: new CoreAppLayoutModel()
  });
};

export default {
  namespaced: true,
  state: emptyState(),
  mutations
  // actions,
  // getters
};
