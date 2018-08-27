import 'reflect-metadata';
import { merge, cloneDeep } from 'lodash';

import METADATA from '../constants/metadata.constant';

export type Partial<T> = { [P in keyof T]?: T[P] };

export class BaseModel {
  serialize?: () => any;

  [index: string]: any;

  constructor(data: any) {
    const properties = {
      ...Reflect.getMetadata(METADATA.PROPERTIES, this)
    };

    for (const key of Object.keys(properties)) {
      const property = properties[key];

      if (!data || !data[key]) {
        if (typeof property.defaultValue !== 'undefined') {
          this[key] = property.defaultValue;
        } else {
          this[key] = null;
        }
      }
    }

    if (data) {
      merge(this, data);
    }

    this.serialize = () => {
      const pros = {
        ...Reflect.getMetadata(METADATA.PROPERTIES, this)
      };

      const clone: { [index: string]: any } = {};

      for (const key of Object.keys(pros)) {
        const property = pros[key];

        if (!property.transient) {
          clone[key] = this[key];
        }
      }

      return clone;
    };
  }
}
