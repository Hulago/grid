import 'reflect-metadata';
import { merge } from 'lodash';

import METADATA from '../constants/metadata.constant';
import validators from '../utils/validations.util';

// tslint:disable-next-line:ban-types
export type klass<T> = { new (...args: any[]): T } | Function;

export interface IValidationOptions {
  i18nMessage?: string;
  constraint?: any;
}

export interface IPropertiesOptions {
  key?: string;
  type?: string;
  required?: boolean;
  transient?: boolean;
  lookup?: boolean;
  lookupField?: string;
  lookupClass?: klass<any>;
  lookupLoop?: boolean;
  relation?: boolean;
  relationClass?: klass<any>;
  readOnly?: boolean;
  defaultValue?: any;
}

export interface IPropertiesMetadata {
  [key: string]: IPropertiesOptions;
}

export interface IValidation {
  fn: Function;
  options?: IValidationOptions | null;
  key: string;
  field?: string | null;
}

export function prop(options: IPropertiesOptions = {}) {
  return (target: any, key: string | symbol, descriptor?: any) => {
    return defineProperty(target, key, options);
  };
}

export function validator(
  validationKey: string,
  validationField: string | null = null,
  options: IValidationOptions | null = null
) {
  return (target: any, key: string | symbol, descriptor: any) => {
    return defineClassValidation(target, key, {
      fn: descriptor.value,
      options,
      field: validationField,
      key: validationKey
    });
  };
}

export function email(options?: IValidationOptions) {
  return (target: object, key: string | symbol) =>
    definePropertyValidation(target, key, { fn: validators.EMAIL, options, key: 'email' });
}

export function max(value: number, options?: IValidationOptions) {
  return (target: object, key: string | symbol) =>
    definePropertyValidation(target, key, {
      fn: validators.MAX(value),
      options: { ...options, constraint: value },
      key: 'max'
    });
}

export function min(value: number, options?: IValidationOptions) {
  return (target: object, key: string | symbol) =>
    definePropertyValidation(target, key, {
      fn: validators.MIN(value),
      options: { ...options, constraint: value },
      key: 'min'
    });
}

export function url(options?: IValidationOptions) {
  return (target: object, key: string | symbol) =>
    definePropertyValidation(target, key, { fn: validators.IS_URL, options, key: 'url' });
}

export function json(options?: IValidationOptions) {
  return (target: object, key: string | symbol) =>
    definePropertyValidation(target, key, { fn: validators.IS_JSON, options, key: 'json' });
}

export function hex(options?: IValidationOptions) {
  return (target: object, key: string | symbol) =>
    definePropertyValidation(target, key, { fn: validators.IS_HEX, options, key: 'hex' });
}

export function alpha(options?: IValidationOptions) {
  return (target: object, key: string | symbol) =>
    definePropertyValidation(target, key, { fn: validators.IS_ALPHA, options, key: 'alpha' });
}

export function alphanumeric(options?: IValidationOptions) {
  return (target: object, key: string | symbol) =>
    definePropertyValidation(target, key, {
      fn: validators.IS_ALPHANUMERIC,
      options,
      key: 'alphanumeric'
    });
}

export function base64(options?: IValidationOptions) {
  return (target: object, key: string | symbol) =>
    definePropertyValidation(target, key, { fn: validators.IS_BASE64, options, key: 'base64' });
}

export function ip(version: number = 4, options?: IValidationOptions) {
  return (target: object, key: string | symbol) =>
    definePropertyValidation(target, key, {
      fn: validators.IS_IP(version),
      options: { ...options, constraint: version },
      key: 'ipv' + version
    });
}

export function gt(value: number, options?: IValidationOptions) {
  return (target: object, key: string | symbol) =>
    definePropertyValidation(target, key, {
      fn: validators.GT(value),
      options: { ...options, constraint: value },
      key: 'gt'
    });
}

export function lt(value: number, options?: IValidationOptions) {
  return (target: object, key: string | symbol) =>
    definePropertyValidation(target, key, {
      fn: validators.LT(value),
      options: { ...options, constraint: value },
      key: 'lt'
    });
}

export function gte(value: number, options?: IValidationOptions) {
  return (target: object, key: string | symbol) =>
    definePropertyValidation(target, key, {
      fn: validators.GTE(value),
      options: { ...options, constraint: value },
      key: 'gte'
    });
}

export function lte(value: number, options?: IValidationOptions) {
  return (target: object, key: string | symbol) =>
    definePropertyValidation(target, key, {
      fn: validators.LTE(value),
      options: { ...options, constraint: value },
      key: 'lte'
    });
}

export function minLength(value: number, options?: IValidationOptions) {
  return (target: object, key: string | symbol) =>
    definePropertyValidation(target, key, {
      fn: validators.MIN_LENGTH(value),
      options: { ...options, constraint: value },
      key: 'minLength'
    });
}

export function maxLength(value: number, options?: IValidationOptions) {
  return (target: object, key: string | symbol) =>
    definePropertyValidation(target, key, {
      fn: validators.MAX_LENGTH(value),
      options: { ...options, constraint: value },
      key: 'maxLength'
    });
}

export function length(value: number, options?: IValidationOptions) {
  return (target: object, key: string | symbol) =>
    definePropertyValidation(target, key, {
      fn: validators.LENGTH(value),
      options: { ...options, constraint: value },
      key: 'length'
    });
}

export function contains(seed: string, options?: IValidationOptions) {
  return (target: object, key: string | symbol) =>
    definePropertyValidation(target, key, {
      fn: validators.CONTAINS(seed),
      options: { ...options, constraint: seed },
      key: 'contains'
    });
}

export function defaultValue(value: any) {
  return (target: object, key: string | symbol) =>
    defineProperty(target, key, {
      defaultValue: value
    });
}

export function endpoint(endpointParam: string) {
  return (target: object) => defineEndpoint(target, endpointParam);
}

export function lookup(lookupField: string, lookupClass: klass<any>, lookupLoop: boolean = false) {
  return (target: object, key: string | symbol) =>
    defineProperty(target, key, {
      lookup: true,
      lookupField,
      transient: true,
      lookupClass,
      lookupLoop
    });
}

export function defineProp(target: klass<any>, key: string | symbol, type: any, options: IPropertiesOptions = {}) {
  const attrs = merge(
    {
      ...Reflect.getMetadata(METADATA.PROPERTIES, target)
    },
    {
      [key]: {
        key,
        type,
        ...options
      }
    }
  );

  Reflect.defineMetadata(METADATA.PROPERTIES, attrs, target);
}

export function defineLookup(
  target: klass<any>,
  key: string | symbol,
  lookupField: string,
  lookupClass: any,
  loop: boolean = true
) {
  defineProperty(target.prototype, key, {
    lookup: true,
    lookupField,
    transient: true,
    lookupClass,
    lookupLoop: loop
  });
}

export function relation(relationClass: klass<any>) {
  return (target: object, key: string | symbol) =>
    defineProperty(target, key, {
      relation: true,
      transient: true,
      relationClass
    });
}

export function model() {
  return (target: object, key: string | symbol) => defineProperty(target, key, {});
}

export function required(options?: IValidationOptions) {
  return (target: object, key: string | symbol) => {
    defineProperty(target, key, {
      required: true
    });
    definePropertyValidation(target, key, { fn: validators.REQUIRED, options, key: 'required' });
  };
}

export interface IPresentationOptions<PropertyType> {
  sortable: boolean;
  title: string;
  description: string;
  defaultValue?: PropertyType;
}

export interface ICrudListProperty {
  key: string;
  i18ntitle: string;
  i18nDescription: string;
  render?: string;
  renderOptions?: any;
  mobile?: boolean;
  desktop?: boolean;
  filter?: boolean;
  formatter?: string;
}

export interface ICrudList {
  [prop: string]: ICrudListProperty;
}

function defineProperty(ctor: object, key: string | symbol, options: IPropertiesOptions = {}) {
  const keyType = Reflect.getMetadata('design:type', ctor, key);
  const attrs = merge(
    {
      ...Reflect.getMetadata(METADATA.PROPERTIES, ctor)
    },
    {
      [key]: {
        key,
        type: keyType && keyType.name ? keyType.name : 'UNKOWN',
        ...options
      }
    }
  );

  Reflect.defineMetadata(METADATA.PROPERTIES, attrs, ctor);
}

function defineEndpoint(ctor: object, endpointParam: string) {
  Reflect.defineMetadata(METADATA.ENDPOINTS, endpointParam, ctor);
}

function definePropertyValidation(target: object, key: string | symbol, validation: IValidation) {
  defineProperty(target, key);
  const validations = (Reflect.getMetadata(METADATA.PROPPERTIES_VALIDATOR, target, key) || []).concat(validation);
  Reflect.defineMetadata(METADATA.PROPPERTIES_VALIDATOR, validations, target, key);
}

function defineClassValidation(target: object, key: string | symbol, validation: IValidation) {
  const validations = (Reflect.getMetadata(METADATA.CLASS_VALIDATOR, target) || []).concat(validation);
  Reflect.defineMetadata(METADATA.CLASS_VALIDATOR, validations, target);
}
