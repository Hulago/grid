import mutations from './base.mutations';
import actions from './base.actions';
import { GridStateModel } from '../models/grid-state.model';

export const emptyState = () => {
  return new GridStateModel({});
};

export default {
  namespaced: true,
  state: emptyState(),
  mutations,
  actions
  // getters
};
