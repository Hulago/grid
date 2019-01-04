import MUTATIONS from '../constants/mutations.constant';
import ACTIONS from '../constants/actions.constant';
import { storageService, authService, dbService, DBEntity } from '../services';
import { CoreStateModel } from '../models/core-state.model';
import { CoreErrorModel, CoreUserModel } from '../models';

import TYPES from '../constants/types.constant';
import { ActionContext } from 'vuex';

// const wds = di.get<WorkerDataService>(TYPES.WorkerDataService);

export default {
  async [ACTIONS.LOGIN](
    context: ActionContext<CoreStateModel, any>,
    { email, password }: { email: string; password: string }
  ) {
    const user: CoreUserModel = dbService.get<CoreUserModel>('USER').findOne('email', email);

    if (user) {
      const sha256Password: string = await authService.sha256(password);
      if (sha256Password === user.passwordHash) {
        context.commit(MUTATIONS.AUTH.SET_AUTHENTICATED, true);
        context.commit(MUTATIONS.AUTH.SET_CURRENT_USER, user);

        return user;
      } else {
        context.commit(MUTATIONS.AUTH.SET_AUTHENTICATED, false);
        throw new CoreErrorModel('CORE_ACTIONS', 'LOGIN', 'invalid email or password', null);
      }
    } else {
      throw new CoreErrorModel('CORE_ACTIONS', 'LOGIN', 'invalid email address', null);
    }
  },

  [ACTIONS.LOGOUT](context: ActionContext<CoreStateModel, any>) {
    context.commit(MUTATIONS.AUTH.SET_AUTHENTICATED, false);
    context.commit(MUTATIONS.AUTH.SET_CURRENT_USER, null);
  },

  async [ACTIONS.SIGNUP](
    context: ActionContext<CoreStateModel, any>,
    { email, password, name }: { email: string; password: string; name: string }
  ) {
    const user: any = dbService.get<CoreUserModel>('USER').find('email', email);

    if (user.length === 0) {
      const passwordHash: string = await authService.sha256(password);

      const coreUser = dbService.get('USER').insert(
        new CoreUserModel({
          email,
          name,
          passwordHash
        })
      );

      await dbService.commit('USER');

      context.commit(MUTATIONS.AUTH.SET_AUTHENTICATED, true);
      context.commit(MUTATIONS.AUTH.SET_CURRENT_USER, coreUser);

      return coreUser;
    } else {
      throw new CoreErrorModel('CORE_ACTIONS', 'SIGNUP', 'email taken', null);

      context.commit(MUTATIONS.AUTH.SET_AUTHENTICATED, false);
      context.commit(MUTATIONS.AUTH.SET_CURRENT_USER, null);
    }
  }

  // [ACTIONS.SET_DEFAULT_THEME](context) {
  //   let coreState: CoreStateModel = context.state;

  //   context.commit(MUTATIONS.SET_CURRENT_THEME, coreState.config.defaultTheme);

  //   storageService.setTheme(context.state.currentTheme);
  // },

  // [ACTIONS.SET_CURRENT_LANGUAGE](context, language: CoreLanguageModel) {
  //   let coreState: CoreStateModel = context.state;

  //   context.commit(MUTATIONS.SET_CURRENT_LANGUAGE, language);

  //   storageService.setCurrentLanguage(coreState.currentLanguage);
  // },

  // async [ACTIONS.POST_MESSAGE](context, message) {
  //   wds.postMessage(message);
  // },

  // async [ACTIONS.GET_FROM_CACHE](context, message) {
  //   let cacheKey = `${message.module}.${message.type}.${message.cacheKey}`;

  //   context.dispatch(ACTIONS.POST_MESSAGE, message);

  //   return storageService.getItem(cacheKey).then(response => {
  //     message.response = response;
  //     context.commit(`${message.module}/${message.mutation}`, message, { root: true });
  //     return response;
  //   });
  // },
};
