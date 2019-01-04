import 'reflect-metadata';
import { BaseService } from './base.service';
import { storageService, StorageService } from './storage.service';

import { klass } from '../types';

import { get, isArray, isObject, isNumber, isString, isBoolean, isEmpty } from 'lodash';

export class DBService extends BaseService {
  db: {
    [entity: string]: DBEntity<any>;
  };

  constructor() {
    super('DB_SERVICE');
    this.db = {};
  }

  async load<T>(entity: string) {
    // register entities
    const registry: string[] = await storageService.getItem('REGISTRY');

    if (!registry) {
      storageService.setItem('REGISTRY', [entity]);
    } else if (registry.indexOf(entity) === -1) {
      storageService.setItem('REGISTRY', [...registry, entity]);
    }

    const dbEntity = await storageService.getItem(entity);
    if (!dbEntity) {
      await storageService.setItem(entity, new DBEntity<T>());
      this.db = {
        ...this.db,
        [entity]: new DBEntity<T>()
      };
    } else {
      this.db = {
        ...this.db,
        [entity]: new DBEntity<T>(dbEntity)
      };
    }
  }

  get<T>(entity: string) {
    return this.db[entity] as DBEntity<T>;
  }

  // TODO Serialize on commit

  async commit(entity: string) {
    const serialized = {
      sequence: this.db[entity].sequence,
      data: this.db[entity].data.map(item => {
        delete item['serialize'];
        return item;
      })
    };

    return storageService.setItem(entity, serialized);
  }
}

export class DBEntity<T> {
  sequence: number;
  data: T[];

  constructor(data?: Partial<DBEntity<T>>) {
    this.sequence = data && data.sequence ? data.sequence : 1;

    // instanciate on load
    this.data = data && data.data ? data.data : [];
  }

  find(key?: string, value: any = null): T[] {
    if (!key) {
      return this.data;
    }
    return this.data.filter(item => get(item, key, undefined) === value);
  }

  // tslint:disable-next-line:no-shadowed-variable
  insert(obj: T): T {
    const data = {
      ...(obj as any),
      id: this.sequence
    };
    this.data.push(data);
    this.sequence++;
    return data;
  }

  findOne(key: string, value: any): any {
    const data = this.data.filter(item => get(item, key, undefined) === value);
    return data.length > 0 ? data[0] : null;
  }
}

export const dbService = new DBService();
