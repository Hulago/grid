import { AbstractControl } from '@/modules/core/models/abstract-control.model';

describe('AbstractControl service', () => {
  class Control extends AbstractControl {
    constructor() {
      super();
    }
  }

  const control = new Control();

  it('Should be an instance of AbstractControl', () => {
    expect(control instanceof AbstractControl).toBeTruthy();
  });

  it('Should have a default state', () => {
    expect(control.$valid).toBeTruthy();
    expect(control.$focus).toBeFalsy();
    expect(control.$touch).toBeFalsy();
    expect(control.$dirty).toBeFalsy();
    expect(control.$enable).toBeTruthy();
    expect(control.$loading).toBeFalsy();
    expect(control.$parent).toBeNull();
    expect(control.$name).toBe('root');
    expect(control.$errors).toBeNull();
    expect(control.validators.length).toBe(0);
    expect(control.executeValidations.length).toBe(0);
  });

  it('Should reduce boolean array with operation AND', () => {
    expect(control.reduceBooleanArray([true, false])).toBeFalsy();
    expect(control.reduceBooleanArray([true, true])).toBeTruthy();
    expect(control.reduceBooleanArray([])).toBeTruthy();
  });

  it('Should throw not implemented', () => {
    expect(() => control.onChange(null)).toThrow('not implemented');
  });

  it('Should add an error', () => {
    control.addError('error', { i18n: 'error message' });
    expect(control.$errors).toHaveProperty('error');
    expect(control.$errors['error'].i18n).toBe('error message');
  });

  it('Should remove an error', () => {
    expect(control.$errors).toHaveProperty('error');
    expect(control.$errors['error'].i18n).toBe('error message');
    control.removeError('error');
    expect(control.$errors).not.toHaveProperty('error');
  });

  it('Should be an form control', () => {
    expect(control.isFormControl()).toBeTruthy();
  });

  it('Should not be an form group', () => {
    expect(control.isFormGroup()).toBeFalsy();
  });

  it('should validate call validators', done => {
    const validator1 = jest.fn().mockReturnValue(true);
    const validator2 = jest.fn().mockReturnValue(false);
    control.validators = [validator1, validator2];
    control.executeValidations().then(res => {
      expect(res).toBeFalsy();
      expect(validator1.mock.calls.length).toBe(1);
      expect(validator2.mock.calls.length).toBe(1);
      done();
    });
  });

  it('should validate and call AsynValidators', done => {
    const validator1 = jest.fn(
      () =>
        new Promise(resolve => {
          setTimeout(() => resolve(true), 100);
        })
    );
    const validator2 = jest.fn(
      () =>
        new Promise(resolve => {
          setTimeout(() => resolve(false), 100);
        })
    );
    control.validators = [validator1, validator2];
    control.executeValidations().then(res => {
      expect(res).toBeFalsy();
      expect(validator1.mock.calls.length).toBe(1);
      expect(validator2.mock.calls.length).toBe(1);
      done();
    });
  });
});
