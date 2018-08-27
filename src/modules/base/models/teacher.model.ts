import { BaseModel, Partial } from '@/modules/core/models/base.model';
import { required, email } from '@/modules/core/decorators/model.decorators';
import { Course } from './course.model';

export class Teacher extends BaseModel {
  @required()
  @email()
  email: string | null = null;

  @required()
  name: string | null = null;

  @required()
  courses: Course[] = [];

  constructor(data?: Partial<Teacher>) {
    super(data);
  }
}
