// import Axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
// import { httpAdapter } from 'axios/lib/adapters/http';
// import { provideSingleton, Inject } from '@core/decorators';
// import { BaseService } from '@core/services/base.service';
// import { AuthService } from '@core/services/auth.service';
// import { UtilsService } from '@core/services/utils.service';
// import { NotificationService } from '@core/services/notification.service';
// import { CacheService } from '@core/services/cache.service';
// import { Store } from 'vuex';
// import { get, isArray, isObject } from 'lodash';

// import TYPES from '@core/constants/types.constant';
// import { di } from '@core/services/di.service';
// import { unmanaged } from 'inversify';

// interface IError {
//   errorCode: number | string;
//   status: number | string;
//   statusText: string;
//   code: string;
//   message: string;
//   raw: any;
// }

// import { CoreStateModel, CoreError } from '@core/models';

// // import { Inject, Service } from './decorators';

// @provideSingleton(TYPES.HTTPService)
// export class HTTPService extends BaseService {
//   public static baseUrl: string;
//   public static language: string = 'en-US';

//   private static store: Store<any>;
//   private static isPrivateEndpoint: (url: string) => boolean;

//   // public storageService: StorageService;
//   @Inject(TYPES.UtilsService) public utilsService: UtilsService;
//   @Inject(TYPES.NotificationService) public notificationService: NotificationService;
//   @Inject(TYPES.CacheService) public cacheService: CacheService;

//   protected $http: AxiosInstance;
//   @Inject(TYPES.AuthService) protected authService: AuthService;

//   private axiosConfig: AxiosRequestConfig;

//   constructor(@unmanaged() module, @unmanaged() axiosConfig?: AxiosRequestConfig) {
//     super(module);

//     this.axiosConfig = axiosConfig || {
//       baseURL: HTTPService.baseUrl,
//       timeout: 20000,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     };

//     this.$http = Axios.create(this.axiosConfig);

//     if (process.env.NODE_ENV !== 'test') {
//       this.$http.interceptors.request.use(this.onRequest.bind(this), error =>
//         Promise.reject(error)
//       );
//     }
//   }

//   setupStore(store) {
//     HTTPService.store = store;
//   }

//   setupPrivateEndpoint(fn: (url: string) => boolean) {
//     HTTPService.isPrivateEndpoint = fn;
//   }

//   onRequest(config) {
//     let coreState: CoreStateModel = HTTPService.store.state.core;
//     let language: string = coreState.currentLanguage.code || 'en-US';

//     if (HTTPService.isPrivateEndpoint(config.url)) {
//       config.headers['Accept-Language'] = `${language},en-US;q=0.8,pt;q=0.6`;

//       return this.authService
//         .refresh()
//         .then(token => {
//           config.headers.Authorization = `Bearer ${token}`;
//           return config;
//         })
//         .catch(e => {
//           let coreError = new CoreError('CORE', 'ON_REQUEST', e.message, e);
//           this.notificationService.debug(
//             'On Request interceptor',
//             e.message,
//             'CORE',
//             'ON_REQUEST',
//             coreError
//           );
//           console.error('On Request interceptor:', coreError);
//           return config;
//         });
//     } else {
//       delete config.headers.Authorization;
//     }

//     return Promise.resolve(config);
//   }

//   async checkError(rawError: any, throwError: boolean = true) {
//     // return Promise.reject(rawError);

//     const error = this.parseError(rawError);

//     const coreError = new CoreError('CORE', this.action, error.message, error);

//     if (error.errorCode === 'ECONNABORTED') {
//       this.notificationService.debug(
//         'Connection error',
//         'timeout exceeded!',
//         'CORE',
//         'CHECK_ERROR',
//         coreError
//       );
//       return Promise.reject(coreError);
//     }

//     // UnAuthorized

//     if (error.status === 401) {
//       await this.authService.logout();
//       this.notificationService.warning(
//         'Unauthorized',
//         error && error.message ? error.message : 'Unauthorized access',
//         'CORE',
//         'CHECK_ERROR',
//         coreError
//       );
//       return Promise.reject(coreError);
//     }

//     return this.errorHandling(coreError, throwError);
//   }

//   errorHandling(coreError: CoreError, throwError: boolean) {
//     if (throwError) {
//       // console.error(JSON.stringify(coreError, null, 4));
//       this.notificationService.debug(
//         'Error Handling',
//         coreError.message,
//         'CORE',
//         'DEFAULT_ERROR_HANDLING',
//         coreError
//       );
//       return Promise.reject(coreError);
//     } else {
//       this.notificationService.warning(
//         'Internal error',
//         `Error code: ${coreError.raw.status}: ${coreError.raw.statusText}<br>Message: ${
//           coreError.message
//         }`,
//         'CORE',
//         'ERROR_HANDLING',
//         coreError
//       );
//       return null;
//     }
//   }

//   parseError(error) {
//     const errorData: any = get(error, 'response.data', {});
//     const errorResponse: any = get(error, 'response', {});

//     return {
//       errorCode: error.code,
//       status: get(errorResponse, 'status', null),
//       statusText: get(errorResponse, 'statusText', null),
//       code: get(errorData, 'code', null),
//       message: get(errorData, 'message', errorResponse.message || error.message),
//       technicalCode: get(errorData, 'technicalCode', null),
//       technicalMessage: get(errorData, 'technicalMessage', null),
//       raw: error
//     };
//   }

//   GET(url: string, cache = false, config: AxiosRequestConfig = null) {
//     const cacheData = this.cacheService.getEntry(url);
//     if (cache && cacheData) {
//       return Promise.resolve(cacheData);
//     }

//     return this.$http
//       .get(url, config)
//       .then(res => {
//         if (isArray(res.data) || isObject(res.data)) {
//           (res.data as any)._count =
//             res.headers && res.headers['x-total-count']
//               ? res.headers['x-total-count']
//               : res.data.length;
//         }

//         return res;
//       })
//       .then(res => {
//         this.cacheService.setEntry(url, res.data);
//         return res.data;
//       })
//       .catch(error => this.checkError(error));
//   }

//   POST(url: string, data?: any, config: AxiosRequestConfig = null) {
//     return this.$http
//       .post(url, data, config)
//       .then(res => res.data)
//       .catch(error => this.checkError(error));
//   }

//   PATCH(url: string, data?: any, config: AxiosRequestConfig = null) {
//     return this.$http
//       .patch(url, data, config)
//       .then(res => res.data)
//       .catch(error => this.checkError(error));
//   }

//   PUT(url: string, data?: any, config: AxiosRequestConfig = null) {
//     return this.$http
//       .put(url, data, config)
//       .then(res => res.data)
//       .catch(error => this.checkError(error));
//   }

//   DELETE(url: string, config: AxiosRequestConfig = null) {
//     return this.$http
//       .delete(url, config)
//       .then(res => res.data)
//       .catch(error => this.checkError(error));
//   }

//   parseUrl(endpoint: string, data: any) {
//     return this.utilsService.parseUrl(endpoint, data);
//   }
// }

// // di.load();
