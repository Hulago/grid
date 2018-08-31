import 'reflect-metadata';
import { BaseService } from './base.service';
import { StorageService } from './storage.service';

import TYPES from '../constants/types.constant';
import METADATA from '../constants/metadata.constant';

import { provideSingleton, Inject } from '../decorators/di.decorators';
import { klass } from '../types';

import { get, isArray, isObject, isNumber, isString, isBoolean, isEmpty } from 'lodash';

@provideSingleton(TYPES.DBService)
export class DBService extends BaseService {
  @Inject(TYPES.StorageService)
  public storageService!: StorageService;

  public db: {
    [entity: string]: DBEntity<any>;
  };

  constructor() {
    super('DB_SERVICE');
    this.db = {};
  }

  async load<T>(entity: string, entityClass: klass<T>) {
    // register entities
    const registry: string[] = await this.storageService.getItem('REGISTRY');

    if (!registry) {
      this.storageService.setItem('REGISTRY', [entity]);
    } else if (registry.indexOf(entity) === -1) {
      this.storageService.setItem('REGISTRY', [...registry, entity]);
    }

    const dbEntity = await this.storageService.getItem(entity);
    if (!dbEntity) {
      await this.storageService.setItem(entity, new DBEntity<T>());
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

    return this.storageService.setItem(entity, serialized);
  }

  // close() {}
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

// di.load();
