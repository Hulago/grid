import { required, maxLength } from '../decorators/model.decorators';
import { BaseModel, Partial } from './base.model';

export class CoreLanguageModel extends BaseModel {
  @required()
  id!: number;

  @required()
  @maxLength(10)
  code!: string;

  @required()
  @maxLength(128)
  name!: string;

  constructor(data?: Partial<CoreLanguageModel>) {
    super(data);
  }
}
