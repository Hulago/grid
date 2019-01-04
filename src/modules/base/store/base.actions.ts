import { ActionContext } from 'vuex';
import ACTIONS from '../constants/actions.constant';
import MUTATIONS from '../constants/mutations.constant';
import ENTITIES from '../constants/entities.constant';
import { GridStateModel } from '../models/grid-state.model';
import { gridService } from '../services/grid.service';

export default {
  async [ACTIONS.LOAD_ENTITIES](context: ActionContext<GridStateModel, any>) {
    const ac = await gridService.loadAcademicYear();

    context.commit(MUTATIONS.SET_ENTITY, {
      entity: ENTITIES.ACADEMIC_YEAR,
      data: ac
    });

    const courses = await gridService.loadCourses();

    context.commit(MUTATIONS.SET_ENTITY, {
      entity: ENTITIES.COURSE,
      data: courses
    });

    const users = await gridService.loadUsers();

    context.commit(MUTATIONS.SET_ENTITY, {
      entity: ENTITIES.USER,
      data: users
    });
  }
};
