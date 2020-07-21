import { Registration } from '~/types';
import { ActionTree } from 'vuex';

import tasks from '~/store/registration/actions/tasks';
import steps from '~/store/registration/actions/steps';
import actions from '~/store/registration/actions/actions';
import actionsets from '~/store/registration/actions/actionsets';

export default <ActionTree<Registration.State, Registration.State>>{
  ...tasks,
  ...steps,
  ...actions,
  ...actionsets,
};
