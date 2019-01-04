import 'reflect-metadata';
import { BaseService } from './base.service';
import { DBService } from './db.service';
import { Store } from 'vuex';
import { NavigationGuard } from 'vue-router';

import { isArray, isObject, isNumber, isString, isBoolean, isEmpty } from 'lodash';

export class AuthService extends BaseService {
  private store!: Store<any>;

  constructor() {
    super('AUTH_SERVICE');
  }

  setup(store: Store<any>) {
    this.store = store;
  }

  validate(): NavigationGuard {
    const self = this;
    return (to, from, next) => {
      if (to.meta.requiresAuth) {
        const auth = self.store.state.core.auth;
        if (!auth || !auth.authenticated) {
          next({ name: 'login' });
        } else {
          next();
        }
      } else {
        next();
      }
    };
  }

  sha256(str: string) {
    // We transform the string into an arraybuffer.
    const buffer = new TextEncoder().encode(str);
    return crypto.subtle.digest('SHA-256', buffer).then(hash => this.hex(hash));
  }

  private hex(buffer: ArrayBuffer) {
    const hexCodes = [];
    const view = new DataView(buffer);
    for (let i = 0; i < view.byteLength; i += 4) {
      // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
      const value = view.getUint32(i);
      // toString(16) will give the hex representation of the number without padding
      const stringValue = value.toString(16);
      // We use concatenation and slice for padding
      const padding = '00000000';
      const paddedValue = (padding + stringValue).slice(-padding.length);
      hexCodes.push(paddedValue);
    }

    // Join all the hex strings into one
    return hexCodes.join('');
  }
}

export const authService = new AuthService();
