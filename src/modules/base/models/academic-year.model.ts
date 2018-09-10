import { BaseModel } from '@/modules/core/models/base.model';
import { Partial } from '@/modules/core/types';
import { required, prop, entity } from '@/modules/core/decorators/model.decorators';
import moment from 'moment';

@entity('ACADEMIC_YEAR')
export class AcademicYearModel extends BaseModel {
  @prop()
  id!: number;

  @required()
  startDate!: string;

  @required()
  endDate!: string;

  constructor(data?: Partial<AcademicYearModel>) {
    super(data);
  }

  get name() {
    return `${moment(this.startDate).format('YYYY')} / ${moment(this.endDate).format('YYYY')}`;
  }
}
