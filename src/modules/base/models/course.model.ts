import { BaseModel, Partial } from '@/modules/core/models/base.model';
import { email } from '@/modules/core/decorators/model.decorators';

export class Course extends BaseModel {
  @email()
  name: string | null = null;

  constructor(data?: Partial<Course>) {
    super(data);
  }
}
