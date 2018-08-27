import { AbstractControl } from '@/modules/core/models/abstract-control.model';
import { FormControl } from '@/modules/core/models/form-control.model';

describe('FormControl Model', () => {
  class Control extends FormControl {
    constructor() {
      super();
    }
  }

  const control = new Control();

  it('Should be an instance of FormControl', () => {
    expect(control instanceof FormControl).toBeTruthy();
  });

  it('Should be an instance of AbstractControl', () => {
    expect(control instanceof AbstractControl).toBeTruthy();
  });

  it('Should set value as null', () => {
    expect(control.value).toBeNull();
  });

  it('Should set a value', () => {
    control.setValue('some value');
    expect(control.value).toBe('some value');
  });

  it('Should validate after set value', done => {
    const validator1 = jest.fn().mockReturnValue(false);
    control.validators = [validator1];
    control.setValue('new value').then(() => {
      expect(control.value).toBe('new value');
      expect(validator1.mock.calls.length).toBe(1);
      expect(control.$valid).toBeFalsy();
      done();
    });
  });
});
