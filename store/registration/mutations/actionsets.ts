import { MutationTree } from 'vuex';
import { Action, Registration } from '~/types';

export default <MutationTree<Registration.State>>{
  // ActionSet
  setActiveActionSet(
    state: Registration.State,
    actionSet: Action.ActionSet | null
  ) {
    state.activeActionSet = actionSet;
  },

  // ActionSet Action
  setActiveActionSetAction(
    state: Registration.State,
    actionSet: Action.Any | null
  ) {
    state.activeActionSetAction = actionSet;
  },

  // ActionSet loop
  setActiveActionSetLoop(state: Registration.State, loopNum: number | null) {
    state.activeActionSetLoop = loopNum;
  },
};
