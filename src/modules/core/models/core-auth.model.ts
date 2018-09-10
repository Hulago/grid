import { defaultValue, email, prop } from '../decorators/model.decorators';
import { BaseModel } from './base.model';
import { Partial } from '../types';

export class CoreAuthModel extends BaseModel {
  @defaultValue(false)
  authenticated!: boolean;

  @email()
  email!: string | null;

  @prop()
  name!: string | null;

  @prop()
  id!: number | string | null;

  constructor(data?: Partial<CoreAuthModel>) {
    super(data);
  }
}
