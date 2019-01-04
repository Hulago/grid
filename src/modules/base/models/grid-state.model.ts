import { BaseModel, CoreUserModel } from '@/modules/core/models';
import { CourseModel } from './course.model';
import { AcademicYearModel } from './academic-year.model';

export class GridStateModel extends BaseModel {
  courses!: CourseModel[];
  academicYears!: AcademicYearModel[];
  users!: CoreUserModel[];

  constructor(data?: Partial<GridStateModel>) {
    super(data);
    if (data && data.courses) {
      this.courses = data.courses.map(c => new CourseModel(c));
    }

    if (data && data.academicYears) {
      this.academicYears = data.academicYears.map(a => new AcademicYearModel(a));
    }

    if (data && data.users) {
      this.users = data.users.map(u => new CoreUserModel(u));
    }
  }
}
