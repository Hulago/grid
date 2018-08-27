import 'reflect-metadata';
import { IPropertiesOptions, IValidation } from '../decorators/model.decorators';
import METADATA from '../constants/metadata.constant';
// import { klass, BaseService, PROPS_TYPE } from '@core/services';
import { BaseService } from './base.service';
import { AbstractControl, IAbstractControlValidator } from '../models/abstract-control.model';
import { FormControl } from '../models/form-control.model';
import { FormGroup } from '../models/form-group.model';
// import TYPES from '@core/constants/types.constant';
// import { di } from '@core/services/di.service';
import { isArray, isObject, isNumber, isString, isBoolean, isEmpty } from 'lodash';

export type klass<T> = { new (...args: any[]): T } | Function;

export interface IFormsService {
  generateFormGroup(ModelClass: klass<any>): any;
}

export const PROPS_TYPE = {
  STRING: 'String',
  NUMBER: 'Number',
  BOOLEAN: 'Boolean',
  ARRAY: 'Array',
  OBJECT: 'Object',
  ANY: 'any'
};

// @provideSingleton(TYPES.FormsService)
export class FormsService extends BaseService implements IFormsService {
  static order = ['required', 'min'];

  generateFormGroup(obj: any, required: boolean = false): FormGroup {
    const metadataProperties = {
      ...this.getProperties(obj),
      ...Reflect.getMetadata(METADATA.PROPERTIES, obj)
    };

    const metadataObj: IValidation[] = Reflect.getMetadata(METADATA.CLASS_VALIDATOR, obj)
      ? Reflect.getMetadata(METADATA.CLASS_VALIDATOR, obj)
      : [];

    const fgValidatiors = metadataObj.map(item => {
      return (control: AbstractControl) => {
        return new Promise(resolve => resolve(item.fn.call(control.value))).then(res => {
          if (res && isBoolean(res)) {
            if (
              item.field &&
              control.$controls &&
              control.$controls[item.field] &&
              control.$controls[item.field].$errors
            ) {
              delete control.$controls[item.field].$errors[item.key];
              if (isEmpty(control.$controls[item.field].$errors)) {
                control.$controls[item.field].$valid = true;
              }
            } else {
              control.removeError(item.key);
            }
            return true;
          }

          if (item.field && control.$controls) {
            control.$controls[item.field].$valid = false;
            control.$controls[item.field].$errors = {
              ...control.$controls[item.field].$errors,
              ...res
            };
          } else {
            control.$errors = {
              ...control.$errors,
              ...res
            };
          }

          // if (control.$controls[item.key]) {
          //   control.$controls[item.key].$valid = false;
          //   (control.$controls[item.key] as FormControl).$errors = {
          //     ...(control.$controls[item.key] as FormControl).$errors,
          //     ...res
          //   };
          // }
          // control.addError(item.key, res as any);
          return false;
        });
      };
    });

    const fg = new FormGroup({}, fgValidatiors, { required });

    // tslint:disable-next-line:forin
    for (const prop in metadataProperties) {
      const metadataProp: IPropertiesOptions = metadataProperties[prop];

      const metadataValidators: IValidation[] = Reflect.getMetadata(METADATA.PROPPERTIES_VALIDATOR, obj, prop);

      if (metadataProp.lookup) {
        continue;
      }

      switch (metadataProp.type) {
        case PROPS_TYPE.BOOLEAN:
        case PROPS_TYPE.STRING:
        case PROPS_TYPE.NUMBER:
        case PROPS_TYPE.ANY:
          fg.addControl(
            metadataProp.key || 'unknown',
            new FormControl(obj[prop], this.genValidators(metadataValidators), {
              required: !!metadataProp.required
            })
          );

          break;
        case PROPS_TYPE.ARRAY:
        case PROPS_TYPE.OBJECT:
          break;
        default:
          if (obj[prop]) {
            fg.addControl(metadataProp.key || 'unknown', this.generateFormGroup(obj[prop], metadataProp.required));
          }
      }
    }
    return fg;
  }

  genValidators(metadataValidators: IValidation[] = []) {
    return metadataValidators.map(item => {
      return (control: AbstractControl) => {
        return new Promise(resolve => resolve(item.fn(control.value))).then(res => {
          if (res && isBoolean(res)) {
            control.removeError(item.key);
            return true;
          }
          control.addError(item.key, {
            i18n:
              item.options && item.options.i18nMessage
                ? item.options.i18nMessage
                : `CORE.ERROR.${item.key.toUpperCase()}`,
            constraint: item.options && 'constraint' in item.options ? item.options.constraint : null,
            value: control.value
          });
          return false;
        });
      };
    });
  }

  getProperties(obj: any) {
    if (!obj) {
      return {};
    }
    return Object.keys(obj).reduce((prev, key) => {
      prev = {
        ...prev,
        [key]: {
          key,
          type: this.getPropertyType(obj, key)
        }
      };
      return prev;
    }, {});
  }

  getPropertyType(target: any, key: string) {
    const val = target[key];

    if (isArray(val)) {
      return PROPS_TYPE.ARRAY;
    }
    if (isObject(val)) {
      return PROPS_TYPE.OBJECT;
    }
    if (isBoolean(val)) {
      return PROPS_TYPE.BOOLEAN;
    }
    if (isString(val)) {
      return PROPS_TYPE.STRING;
    }
    if (isNumber(val)) {
      return PROPS_TYPE.NUMBER;
    }
    return PROPS_TYPE.ANY;
  }
}

// di.load();
