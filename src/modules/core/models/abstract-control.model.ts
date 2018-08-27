import { get, debounce, has, forOwn } from 'lodash';

export type IAbstractControlValidator = (ac: AbstractControl) => Promise<boolean> | boolean;

export interface IAbstractControlError {
  i18n: string;
  value?: any;
  constraint?: any;
}

// export interface IControls {
//   [control: string]: IAbstractControl;
// }

// export interface IAbstractControl {
//   $valid: boolean;
//   $focus: boolean;
//   $touch: boolean;
//   $dirty: boolean;
//   $enable: boolean;
//   $loading: boolean;
//   $parent: IAbstractControl | null;
//   $controls?: { [control: string]: IAbstractControl };
//   value: any;
//   $errors?: any;
//   validateForm?: any;
//   validate?: any;
//   isEmpty: () => boolean;
// }

const DEFAULT_DEBOUNCE_TIMEOUT = 0;

export class AbstractControl {
  public $name: string;
  public $valid: boolean;
  public $required: boolean;
  public $focus: boolean;
  public $touch: boolean;
  public $dirty: boolean;
  public $enable: boolean;
  public $loading: boolean;
  public $parent: AbstractControl | null;
  public $controls?: { [control: string]: AbstractControl };
  public debounce: number;
  public value: any;
  public $errors?: any;

  public validators: IAbstractControlValidator[];

  public validateDebounce: () => Promise<any>;

  constructor(validators: IAbstractControlValidator[] = [], options: any = {}) {
    this.$name = 'root';
    this.$valid = true;
    this.$focus = false;
    this.$touch = false;
    this.$dirty = false;
    this.$enable = true;
    this.$required = options && options.required ? true : false;
    this.$loading = false;
    this.debounce = options && options.debounce ? options.debounce : DEFAULT_DEBOUNCE_TIMEOUT;
    this.value = null;
    this.$parent = null;
    this.$errors = null;
    this.validators = validators;

    if (this.debounce === 0) {
      this.validateDebounce = this.validate;
    } else {
      this.validateDebounce = debounce(() => {
        return this.validate();
      }, this.debounce);
    }
  }

  reduceBooleanArray(arr: boolean[]) {
    return arr.reduce((acc, item) => {
      return acc && item;
    }, true);
  }

  onChange(control: AbstractControl | null): boolean {
    throw new Error('not implemented');
  }

  isEmpty(): boolean {
    throw new Error('not implemented');
  }

  //  Execute onChange to notify parent of a state change
  // TODO TEST
  notifyParent() {
    if (this.$parent && this.$parent.onChange) {
      this.$parent.onChange(this);
    }
  }

  addError(error: string, message: IAbstractControlError) {
    this.$errors = {
      ...this.$errors,
      [error]: message
    };
  }

  removeError(error: string) {
    if (this.$errors && this.$errors[error]) {
      delete this.$errors[error];
      // make it  reactive
      this.$errors = {
        ...this.$errors
      };
    }
  }

  // TODO TEST
  validate(notify = true) {
    if (this.$required && this.isEmpty()) {
      this.$valid = false;

      // add error
      this.addError('required', {
        i18n: 'CORE.ERROR.REQUIRED'
      });

      if (notify) {
        this.notifyParent();
      }

      return Promise.resolve(this.$valid);
    }

    if (this.$required && !this.isEmpty()) {
      this.$valid = true;
      this.removeError('required');
    }

    this.$loading = true;

    return this.executeValidations().then(valid => {
      this.$valid = valid;
      this.$loading = false;
      if (notify) {
        this.notifyParent();
      }
      return this.$valid;
    });
  }

  isFormGroup() {
    return has(this, '$controls');
  }

  isFormControl() {
    return !has(this, '$controls');
  }

  // TODO TEST
  validateForm(): Promise<boolean> {
    if (this.isFormGroup()) {
      // let validSync = this.validateSync();
      if (this.$required && this.isEmpty()) {
        this.addError('required', {
          i18n: 'CORE.ERROR.REQUIRED'
        });
        return Promise.resolve(false);
      } else {
        this.removeError('required');
      }

      if (!this.$required && this.isEmpty()) {
        this.removeError('required');
        return Promise.resolve(true);
      }

      const arr: Array<Promise<any>> = [];
      forOwn(this.$controls, (control: AbstractControl, key: string) => {
        arr.push(Promise.resolve(control.validateForm()));
      });

      return Promise.all(arr)
        .then(all => {
          const result = all.reduce((acc, res) => acc && res, true);
          this.$valid = result;
          return result;
        })
        .then(result => {
          return this.executeValidations().then(res => {
            this.$valid = res && result;
            return this.$valid;
          });
        });
    } else {
      return this.validate();
    }
  }
  /**
   *
   */
  executeValidations(): Promise<boolean> {
    if (this.$required && this.isEmpty()) {
      this.addError('required', {
        i18n: 'CORE.ERROR.REQUIRED'
      });
      return Promise.resolve(false);
    } else {
      this.removeError('required');
    }

    if (!this.validators || this.validators.length === 0) {
      return Promise.resolve(true);
    }

    // put everything in promises
    const promiseArray = this.validators.map(val => Promise.resolve(val.call(this, this)));

    return Promise.all(promiseArray)
      .then(arr => {
        return this.reduceBooleanArray(arr);
      })
      .catch(error => {
        console.error(error);
        return false;
      });
  }
}
