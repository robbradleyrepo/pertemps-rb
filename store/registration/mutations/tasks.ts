import { MutationTree } from 'vuex';
import { Registration } from '~/types';

export default <MutationTree<Registration.State>>{
  // Active task ID
  setActiveTaskId(state: Registration.State, taskId: string) {
    state.activeTaskId = taskId;
  },

  // Task intro
  setTaskIntroActive(state: Registration.State, active: boolean) {
    state.taskIntroIsActive = active;
  },
};
