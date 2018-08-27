import { forOwn, set, debounce } from 'lodash';
import { AbstractControl, IAbstractControlValidator } from './abstract-control.model';

export class FormGroup extends AbstractControl {
  constructor(
    controls: { [control: string]: AbstractControl } = {},
    validators: IAbstractControlValidator[] = [],
    options: any = {}
  ) {
    super(validators, options);
    this.$controls = controls;
    this.value = {};

    const self = this;

    forOwn(this.$controls, (control: AbstractControl, controlName: string) => {
      set(this, controlName, control);
      control.$parent = null;
      control.$parent = self;
      set(control, '$name', controlName);
      set(this.value, controlName, control.value);
    });

    if (this.debounce === 0) {
      this.validateDebounce = this.validate;
    } else {
      this.validateDebounce = debounce(() => {
        return this.validate();
      }, this.debounce);
    }
  }

  isEmpty() {
    if (this.value === null) {
      return true;
    }

    const childsArray = [];

    if (this.$controls && this.$controls !== null) {
      for (const key of Object.keys(this.$controls)) {
        childsArray.push(this.$controls[key].isEmpty());
      }

      return this.reduceBooleanArray(childsArray);
    }

    return false;
  }

  addControl(name: string, c: AbstractControl) {
    if (this.$controls) {
      this.$controls[name] = c;
    }
    c.$name = name;
    c.$parent = this;
    this.value[name] = c.value;
  }

  validate(notify = true) {
    // if required and value is null return false
    // TODO implement empty
    if (this.$required && this.isEmpty()) {
      return Promise.resolve(false);
    }

    const childValidations = [];
    // get all valid state from the child controls
    if (this.$controls) {
      for (const key of Object.keys(this.$controls)) {
        childValidations.push(this.$controls[key].$valid);
      }
    }

    const childValidation = this.reduceBooleanArray(childValidations);

    if (!childValidation) {
      this.$valid = false;

      // ???? Should notify parent
      if (notify) {
        this.notifyParent();
      }

      return Promise.resolve(false);
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

  onChange(state: AbstractControl) {
    if (state.$dirty) {
      this.$dirty = true;
    }
    this.$focus = state.$focus;
    if (!this.$touch) {
      this.$touch = state.$touch;
    }

    this.$loading = state.$loading;
    set(this.value, state.$name, state.value);
    this.validate().then(() => {
      this.notifyParent();
    });

    return false;
  }

  setValue(value: object) {
    this.$dirty = true;
    this.$touch = true;

    const arr: Array<Promise<any>> = [];

    forOwn(value, (val, key) => {
      if (this.$controls && this.$controls[key]) {
        arr.push((this.$controls[key] as any).setValue(val));
      } else {
        console.warn(`invalid property ${key}`);
      }
    });

    return Promise.all(arr).then(() => {
      return this.validateDebounce();
    });
  }
}
