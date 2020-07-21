import { MutationTree } from 'vuex';
import { Action, Registration } from '~/types';
import Merge from 'lodash/merge';

export default <MutationTree<Registration.State>>{
  // Action values
  setActionValue(state: Registration.State, value: Action.SubmitValue.Any) {
    state.actionValues = Merge(state.actionValues, value);
  },

  // Action ID
  setActiveActionId(state: Registration.State, actionId: string) {
    state.activeActionId = actionId;
  },

  // Active action value
  setActiveActionValue(
    state: Registration.State,
    value: Action.InputValue.Any | null
  ) {
    const valueType = Object.prototype.toString.call(value);

    if (valueType === '[object Object]') {
      state.activeActionValue = Object.assign({}, value);
    } else {
      state.activeActionValue = value;
    }
  },

  // Active dependency action
  setActiveDependencyActionId(
    state: Registration.State,
    dependencyActionId: string
  ) {
    state.activeDependencyActionId = dependencyActionId;
  },
};
