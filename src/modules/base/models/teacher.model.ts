import { BaseModel } from '@/modules/core/models/base.model';
import { Partial } from '@/modules/core/types';
import { required, email } from '@/modules/core/decorators/model.decorators';
import { CourseModel } from './course.model';
import { CoreUserModel } from '@/modules/core/models';

export class TeacherModel extends BaseModel {
  @required()
  user!: CoreUserModel;

  @required()
  courses: CourseModel[] = [];

  constructor(data?: Partial<TeacherModel>) {
    super(data);
  }
}
