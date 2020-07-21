import { MutationTree } from 'vuex';
import { Registration } from '~/types';

export default <MutationTree<Registration.State>>{
  // Flow outro
  setFlowOutroActive(state: Registration.State, active: boolean) {
    state.flowOutroIsActive = active;
  },
};
