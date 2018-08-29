// import * as moment from 'moment';
// import GETTERS from '@core/constants/getters.constant';
// import { CoreStateModel, CoreUserModel } from '@core/models';

// export default {
//   [GETTERS.AUTH.ROLES](state: CoreStateModel, getters: any) {
//     let resourceRoles = [];
//     let realmRoles = [];

//     if (
//       state.auth &&
//       state.auth.authenticated &&
//       state.auth.parsedToken &&
//       state.auth.parsedToken.aud &&
//       state.auth.parsedToken.resource_access &&
//       state.auth.parsedToken.resource_access[state.auth.parsedToken.aud] &&
//       state.auth.parsedToken.resource_access[state.auth.parsedToken.aud].roles
//     ) {
//       resourceRoles = state.auth.parsedToken.resource_access[state.auth.parsedToken.aud].roles;
//     }

//     if (
//       state.auth &&
//       state.auth.authenticated &&
//       state.auth.parsedToken &&
//       state.auth.parsedToken.aud &&
//       state.auth.parsedToken.realm_access &&
//       state.auth.parsedToken.realm_access.roles
//     ) {
//       realmRoles = state.auth.parsedToken.realm_access.roles;
//     }

//     return [...realmRoles, ...resourceRoles];
//   }
// };
