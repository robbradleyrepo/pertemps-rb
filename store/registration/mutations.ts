import { MutationTree } from 'vuex';
import { Registration } from '~/types';

import flow from '~/store/registration/mutations/flow';
import tasks from '~/store/registration/mutations/tasks';
import steps from '~/store/registration/mutations/steps';
import actions from '~/store/registration/mutations/actions';
import actionsets from '~/store/registration/mutations/actionsets';

export default <MutationTree<Registration.State>>{
  // API status
  setApiStatus(state: Registration.State, apiData: Registration.ApiData) {
    state.apiStatus = apiData;
  },

  ...flow,
  ...tasks,
  ...steps,
  ...actions,
  ...actionsets,
};
