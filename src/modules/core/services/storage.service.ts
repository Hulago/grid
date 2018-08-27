import * as localforage from 'localforage';

// import STORAGE from '@core/constants/storage.constant';

// import { CoreThemeModel, CoreLanguageModel } from '@core/models';
// import { Service, provideSingleton } from '@core/decorators';
import { BaseService } from './base.service';

// import TYPES from '@core/constants/types.constant';
// import { di } from '@core/services/di.service';

// @provideSingleton(TYPES.StorageService)
export class StorageService extends BaseService {
  private db: LocalForage;

  constructor() {
    super('STORAGE_SERVICE');
    this.db = localforage;
  }

  setup(appName: string) {
    this.db.config({
      driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
      name: appName
    });
  }

  setItem(key: string, value: any) {
    return this.db.setItem(key, value);
  }

  getItem(key: string) {
    return this.db.getItem(key);
  }

  removeItem(key: string) {
    return this.db.removeItem(key);
  }
}

// di.load();
