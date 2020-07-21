import { Registration, Action } from '~/types';
import { ActionTree } from 'vuex';

export default <ActionTree<Registration.State, Registration.State>>{
  /**
   * Activate an actionset, of a specific ID
   *
   * @param {{ actionSetId: string }} payload
   * @returns {boolean}
   */
  activateActionSet(
    { state, commit, getters },
    payload: { actionSetId: string }
  ): boolean {
    if (!payload || !payload.actionSetId) return false;

    const actionSet: Action.ActionSet = getters.actionFromId(
      payload.actionSetId
    );

    if (state.activeActionSet !== actionSet) {
      commit('setActiveActionSet', actionSet);
    }

    return true;
  },

  /**
   * Activate an action of the active actionset, of a specific ID
   *
   * @param {{ action: Action.Any }} payload
   * @returns {boolean}
   */
  activateActionSetAction(
    { state, commit },
    payload: { action: Action.Any }
  ): boolean {
    if (!payload || !payload.action) return false;

    if (state.activeActionSetAction !== payload.action) {
      commit('setActiveActionSetAction', payload.action);
    }

    return true;
  },

  /**
   * Deactivate all action sets
   */
  deactivateActionSetLoop({ state, commit }) {
    if (state.activeActionSetLoop) {
      commit('setActiveActionSetLoop', null);
      commit('setActiveActionSetAction', null);
      commit('setActiveActionSet', null);
    }
  },

  /**
   * Deactivate all actionsets
   */
  deactivateActionSets({ state, commit }) {
    if (state.activeActionSet) commit('setActiveActionSet', null);
  },

  /**
   * Activate the first action of the active actionset
   *
   * @returns {boolean}
   */
  activateFirstActionOfActionSet({ state, dispatch }): boolean {
    if (
      !state.activeActionSet ||
      !state.activeActionSet.actions ||
      state.activeActionSet.actions.length <= 0
    ) {
      return false;
    }

    const firstAction = state.activeActionSet.actions[0];

    if (!firstAction) return false;

    dispatch('activateActionSetAction', { action: firstAction });

    return true;
  },

  /**
   * Activate the next action of the active actionset
   *
   * @returns {boolean}
   */
  activateNextActionOfActionSet({ state, dispatch, getters }): boolean {
    if (
      !state.activeActionSet ||
      !state.activeActionSet.actions ||
      state.activeActionSet.actions.length <= 0 ||
      getters.activeActionSetIndex < 0
    ) {
      return false;
    }

    const nextAction =
      state.activeActionSet.actions[getters.activeActionSetIndex + 1];

    if (!nextAction) return false;

    dispatch('activateActionSetAction', { action: nextAction });

    return true;
  },

  /**
   * Activate the previous action of the active actionset
   *
   * @returns {boolean}
   */
  activatePreviousActionOfActionSet({ state, dispatch, getters }): boolean {
    if (
      !state.activeActionSet ||
      !state.activeActionSet.actions ||
      state.activeActionSet.actions.length <= 0 ||
      getters.activeActionSetIndex < 0
    ) {
      return false;
    }

    const previousAction =
      state.activeActionSet.actions[getters.activeActionSetIndex - 1];

    if (!previousAction) return false;

    dispatch('activateActionSetAction', { action: previousAction });

    return true;
  },

  /**
   * Activate first loop of actionset
   *
   * @returns {boolean}
   */
  activateFirstActionSetLoop({ state, commit }): boolean {
    if (!state.activeActionSetLoop) {
      commit('setActiveActionSetLoop', 0);

      return true;
    }

    return false;
  },

  /**
   * Activate next loop of actionset
   *
   * @returns {boolean}
   */
  activateNextActionSetLoop({ state, commit }): boolean {
    if (typeof state.activeActionSetLoop !== 'number') return false;

    commit('setActiveActionSetLoop', state.activeActionSetLoop + 1);

    return true;
  },
};
