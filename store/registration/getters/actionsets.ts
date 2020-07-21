import { Action, Registration } from '~/types';
import { GetterTree } from 'vuex';

export default <GetterTree<Registration.State, Registration.State>>{
  /**
   * Get index of action within the active action set, from the action ID
   *
   * @param {string} actionId
   * @returns {number}
   */
  actionIndexOfActionSet: (state: Registration.State, getters: any): {} => (
    actionId: string
  ): number => {
    if (
      !state.activeActionSet ||
      !state.activeActionSet.actions ||
      state.activeActionSet.actions.length <= 0
    ) {
      return -1;
    }

    return state.activeActionSet.actions.findIndex(
      (action: Action.Any) => action.id === actionId
    );
  },

  /**
   * Get index of active action within the active action set
   *
   * @returns {number}
   */
  activeActionSetIndex(state: Registration.State, getters: any): number {
    if (!state.activeActionSetAction) return -1;

    return getters.actionIndexOfActionSet(state.activeActionSetAction.id);
  },

  /**
   * Check if the current action is the last of the active actionset
   *
   * @returns {boolean}
   */
  actionIsLastOfActionSet(state: Registration.State, getters: any): boolean {
    if (
      !state.activeActionSet ||
      !state.activeActionSet.actions ||
      getters.activeActionSetIndex < 0
    ) {
      return false;
    }

    if (
      getters.activeActionSetIndex + 1 >=
      state.activeActionSet.actions.length
    ) {
      return true;
    }

    return false;
  },
};
