import { BaseModel } from '@/modules/core/models/base.model';
import { Partial } from '@/modules/core/types';
import { required, email, entity, prop } from '@/modules/core/decorators/model.decorators';

@entity('USER')
export class CoreUserModel extends BaseModel {
  @prop()
  id!: number;

  @required()
  @email()
  email!: string;

  @required()
  name!: string;

  @required()
  passwordHash!: string;

  constructor(data?: Partial<CoreUserModel>) {
    super(data);
  }
}
