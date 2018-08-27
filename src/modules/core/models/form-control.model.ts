import { AbstractControl, IAbstractControlValidator } from './abstract-control.model';

export interface IFromControlOptions {
  debounce?: number;
  required?: boolean;
}

export class FormControl extends AbstractControl {
  constructor(value: any = null, validators: IAbstractControlValidator[] = [], options: IFromControlOptions = {}) {
    super(validators, options);
    this.value = value;
  }

  isEmpty() {
    return this.value === null;
  }

  setValue(value: any) {
    this.value = value;
    return this.validateDebounce();
  }
}
