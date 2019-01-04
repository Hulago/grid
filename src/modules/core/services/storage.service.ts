import * as localforage from 'localforage';

import { BaseService } from './base.service';

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

  getItem(key: string): Promise<any> {
    return this.db.getItem(key);
  }

  removeItem(key: string) {
    return this.db.removeItem(key);
  }
}

export const storageService = new StorageService();
