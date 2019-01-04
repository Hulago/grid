import 'reflect-metadata';

import { dbService, BaseService } from '@/modules/core/services';
import moment from 'moment';
import { AcademicYearModel } from '../models/academic-year.model';
import { CourseModel } from '../models/course.model';
import ENTITIES from '../constants/entities.constant';
import { CoreUserModel } from '@/modules/core/models';

export class GridService extends BaseService {
  constructor() {
    super('GRID_SERVICE');
  }

  async loadAcademicYear() {
    await dbService.load<AcademicYearModel>(ENTITIES.ACADEMIC_YEAR);
    const academicYear = dbService.get<AcademicYearModel>(ENTITIES.ACADEMIC_YEAR).find();
    if (academicYear.length === 0) {
      dbService.get<AcademicYearModel>(ENTITIES.ACADEMIC_YEAR).insert(
        new AcademicYearModel({
          startDate: moment('2018-09-01').toISOString(),
          endDate: moment('2019-07-31').toISOString()
        })
      );
      await dbService.commit('ACADEMIC_YEAR');

      return dbService.get<AcademicYearModel>(ENTITIES.ACADEMIC_YEAR).find();
    }

    return academicYear;
  }

  async loadCourses() {
    return await this.loadEntity(ENTITIES.COURSE);
  }

  async loadUsers() {
    return await this.loadEntity(ENTITIES.USER);
  }

  async loadEntity<T>(entity: string) {
    await dbService.load<T>(entity);
    const data = dbService.get<T>(entity).find();
    return data;
  }
}

export const gridService = new GridService();
