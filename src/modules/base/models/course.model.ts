import { BaseModel } from '@/modules/core/models/base.model';
import { Partial } from '@/modules/core/types';
import { email } from '@/modules/core/decorators/model.decorators';

export class CourseModel extends BaseModel {
  @email()
  name: string | null = null;

  constructor(data?: Partial<CourseModel>) {
    super(data);
  }
}
