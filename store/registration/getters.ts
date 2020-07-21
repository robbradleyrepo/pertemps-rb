import { GetterTree } from 'vuex';
import { Registration } from '~/types';

import tasks from '~/store/registration/getters/tasks';
import steps from '~/store/registration/getters/steps';
import actions from '~/store/registration/getters/actions';
import actionsets from '~/store/registration/getters/actionsets';
import candidate from '~/store/registration/getters/candidate';

export default <GetterTree<Registration.State, Registration.State>>{
  ...tasks,
  ...steps,
  ...actions,
  ...actionsets,
  ...candidate,
};
