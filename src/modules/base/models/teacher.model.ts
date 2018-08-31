import { BaseModel } from '@/modules/core/models/base.model';
import { Partial } from '@/modules/core/types';
import { required, email } from '@/modules/core/decorators/model.decorators';
import { CourseModel } from './course.model';

export class TeacherModel extends BaseModel {
  @required()
  @email()
  email: string | null = null;

  @required()
  name: string | null = null;

  @required()
  passwordHash: string | null = null;

  @required()
  courses: CourseModel[] = [];

  constructor(data?: Partial<TeacherModel>) {
    super(data);
  }
}
