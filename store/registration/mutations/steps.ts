import { MutationTree } from 'vuex';
import { Registration } from '~/types';

export default <MutationTree<Registration.State>>{
  // Active step ID
  setActiveStepId(state: Registration.State, stepId: string) {
    state.activeStepId = stepId;
  },

  // Step intro
  setStepIntroActive(state: Registration.State, active: boolean) {
    state.stepIntroIsActive = active;
  },

  // Step outro
  setStepOutroActive(state: Registration.State, active: boolean) {
    state.stepOutroIsActive = active;
  },
};
