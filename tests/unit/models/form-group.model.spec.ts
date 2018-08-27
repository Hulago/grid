import { AbstractControl } from '@/modules/core/models/abstract-control.model';
import { FormGroup } from '@/modules/core/models/form-group.model';
import { FormControl } from '@/modules/core/models/form-control.model';

describe('FormGroup Model', () => {
  class Group extends FormGroup {
    constructor() {
      super();
    }
  }

  const group = new Group();

  it('Should be an instance of FormControl', () => {
    expect(group instanceof FormGroup).toBeTruthy();
  });

  it('Should be an instance of AbstractControl', () => {
    expect(group instanceof AbstractControl).toBeTruthy();
  });

  it('Should set value as empty object', () => {
    expect(JSON.stringify(group.value)).toBe(JSON.stringify({}));
  });

  it('Should have a default state', () => {
    expect(group.$valid).toBeTruthy();
    expect(group.$focus).toBeFalsy();
    expect(group.$touch).toBeFalsy();
    expect(group.$dirty).toBeFalsy();
    expect(group.$enable).toBeTruthy();
    expect(group.$loading).toBeFalsy();
    expect(group.$parent).toBeNull();
    expect(group.$name).toBe('root');
    expect(group.$errors).toBeNull();
    expect(group.validators.length).toBe(0);
  });

  it('Should add a control', () => {
    group.addControl('control1', new FormControl());
    if (group.$controls) {
      expect(group.$controls['control1']).toBeDefined();
      expect(group.value['control1']).toBeDefined();
    }
  });

  it('Should set value for the formGroup', done => {
    group.setValue({ control1: 1 }).then(() => {
      if (group.$controls) {
        expect(group.$controls['control1'].value).toBe(1);
      }
      done();
    });
  });

  it('Should add a control group', () => {
    group.addControl('group1', new FormGroup());
    if (group.$controls) {
      expect(group.$controls['group1']).toBeDefined();
      expect((group.$controls['group1'] as AbstractControl).isFormGroup()).toBeTruthy();
    }

    expect(group.value['group1']).toBeDefined();
    if (group.$controls) {
      const group1 = group.$controls['group1'] as FormGroup;
      expect(group1.$parent).toBe(group);
    }
  });

  it('Should change state and notify parent', done => {
    if (group.$controls) {
      const group1 = group.$controls['group1'] as FormGroup;

      const validator = jest.fn().mockReturnValue(true);
      const control1 = new FormControl(2, [validator]);

      group1.addControl('control1', control1);

      group1.setValue({ control1: 1 }).then(() => {
        expect(group.$dirty).toBeTruthy();
        expect(group.$focus).toBeFalsy();
        expect(group.$valid).toBeTruthy();
        expect(validator.mock.calls.length).toBe(1);
        expect(group.value['group1'].control1).toBe(1);
        expect(control1.$valid).toBeTruthy();
        // done();

        control1.setValue(1).then(() => {
          expect(control1.$valid).toBeTruthy();
          expect(validator.mock.calls.length).toBe(2);
          done();
        });
      });
    }
  });
});
