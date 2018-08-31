import { defaultValue, email, prop } from '../decorators/model.decorators';
import { BaseModel } from './base.model';
import { Partial } from '../types';

export class CoreAuthModel extends BaseModel {
  @defaultValue(false)
  authenticated!: boolean;

  @email()
  email!: string;

  @prop()
  name!: string;

  @prop()
  id!: number | string;

  constructor(data?: Partial<CoreAuthModel>) {
    super(data);
  }
}
