import { BaseModel } from '@/modules/core/models/base.model';
import { Partial } from '@/modules/core/types';
import { entity, prop, required } from '@/modules/core/decorators/model.decorators';

@entity('COURSE')
export class CourseModel extends BaseModel {
  @prop()
  id!: number;

  @required()
  name: string | null = null;

  constructor(data?: Partial<CourseModel>) {
    super(data);
  }
}
