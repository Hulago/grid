import MUTATIONS from '../constants/mutations.constant';
import ENTITIES from '../constants/entities.constant';
import { GridStateModel } from '../models/grid-state.model';

export default {
  [MUTATIONS.SET_ENTITY](state: GridStateModel, payload: { entity: string; data: any[] }) {
    switch (payload.entity) {
      case ENTITIES.USER:
        state.users = [...payload.data];
        break;
      case ENTITIES.ACADEMIC_YEAR:
        state.academicYears = [...payload.data];
        break;
      case ENTITIES.COURSE:
        state.courses = [...payload.data];
        break;
      default:
        console.error('UNKOWN ENTITY', payload.entity);
    }
  }
};
