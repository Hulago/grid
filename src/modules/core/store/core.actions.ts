// import MUTATIONS from '@core/constants/mutations.constant';
// import ACTIONS from '@core/constants/actions.constant';
// import { StorageService, WorkerDataService, AuthService } from '@core/services';
// import { CoreStateModel, IMessage, CoreThemeModel, CoreLanguageModel } from '@core/models';

// import TYPES from '@core/constants/types.constant';
// import { di } from '@core/services/di.service';

// const wds = di.get<WorkerDataService>(TYPES.WorkerDataService);
// const storageService = di.get<StorageService>(TYPES.StorageService);
// const authService = di.get<AuthService>(TYPES.AuthService);

// export default {
//   [ACTIONS.SET_CURRENT_THEME](context, theme: CoreThemeModel) {
//     context.commit(MUTATIONS.SET_CURRENT_THEME, theme);

//     storageService.setTheme(context.state.currentTheme);
//   },

//   [ACTIONS.SET_DEFAULT_THEME](context) {
//     let coreState: CoreStateModel = context.state;

//     context.commit(MUTATIONS.SET_CURRENT_THEME, coreState.config.defaultTheme);

//     storageService.setTheme(context.state.currentTheme);
//   },

//   [ACTIONS.SET_CURRENT_LANGUAGE](context, language: CoreLanguageModel) {
//     let coreState: CoreStateModel = context.state;

//     context.commit(MUTATIONS.SET_CURRENT_LANGUAGE, language);

//     storageService.setCurrentLanguage(coreState.currentLanguage);
//   },

//   async [ACTIONS.POST_MESSAGE](context, message) {
//     wds.postMessage(message);
//   },

//   async [ACTIONS.GET_FROM_CACHE](context, message) {
//     let cacheKey = `${message.module}.${message.type}.${message.cacheKey}`;

//     context.dispatch(ACTIONS.POST_MESSAGE, message);

//     return storageService.getItem(cacheKey).then(response => {
//       message.response = response;
//       context.commit(`${message.module}/${message.mutation}`, message, { root: true });
//       return response;
//     });
//   },

//   async [ACTIONS.LOGOUT](context, message) {
//     await authService.logout();

//     context.commit(MUTATIONS.AUTH.SET_AUTHENTICATED, false);
//   }
// };
