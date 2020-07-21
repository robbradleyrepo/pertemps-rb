import { Action, Registration } from '~/types';
import { ActionTree } from 'vuex';

export default <ActionTree<Registration.State, Registration.State>>{
  /**
   * Activate the first action in a step, of a specific step ID
   *
   * @param {{ stepId: string; }} payload
   * @returns {boolean}
   */
  activateFirstActionOfStep(
    { dispatch, getters },
    payload: { stepId: string }
  ): boolean {
    if (!payload || !payload.stepId) return false;

    const firstAction: Action.Any | false = getters.firstActionOfStep(
      payload.stepId
    );

    if (!firstAction) return false;

    dispatch('activateAction', { actionId: firstAction.id });

    return true;
  },

  /**
   * Activate the first dependency question of an action
   *
   * @param {{ actionId: string; value: string }} payload
   * @returns {boolean}
   */
  activateFirstDependencyAction(
    { dispatch, getters },
    payload: { actionId: string; value: string }
  ): boolean {
    if (!payload || !payload.actionId || !payload.value) return false;

    const firstAction: Action.Any | null = getters.firstDependencyOfAction(
      payload
    );

    if (!firstAction) return false;

    dispatch('activateAction', { actionId: firstAction.id });

    return true;
  },

  /**
   * Activate the last dependency question of an action
   * Taking into account which questions have been answered
   *
   * @param { string } actionId
   * @returns {boolean}
   */
  activateLastDependencyAction(
    { dispatch, getters },
    actionId: string
  ): boolean {
    if (!actionId) return false;

    const dependencyQuestions:
      | Action.Any[]
      | null = getters.allChildActionsRecursive({
      actionId: actionId,
      onlyCompleted: true,
    });

    if (dependencyQuestions && dependencyQuestions.length > 0) {
      dependencyQuestions.sort((a, b) => {
        if (a.actionDepth && b.actionDepth) {
          return b.actionDepth - a.actionDepth;
        } else {
          return 0;
        }
      });

      dispatch('activateAction', { actionId: dependencyQuestions[0].id });

      return true;
    } else {
      return false;
    }
  },

  /**
   * Activate the next action in a step, after a specific action ID
   *
   * @param {{ actionId: string; }} payload
   * @returns {boolean}
   */
  activateNextPrimaryAction(
    { dispatch, getters },
    payload: { actionId: string }
  ): boolean {
    if (!payload || !payload.actionId) return false;

    // const currentAction: Action.Any | false = getters.actionFromId(payload.actionId);

    // if (currentAction !== false) {
    //   const dependencyQuestions: Action.Any | undefined = currentAction.dependencyQuestions;

    //   if (dependencyQuestions) {
    //     const currentActionValue: Action.InputValue.Any | null = getters.actionValue(payload.actionId);

    //     if (currentActionValue) {

    //     }
    //   }
    // }

    const nextPrimaryAction: Action.Any | false = getters.nextPrimaryAction(
      payload.actionId
    );

    if (!nextPrimaryAction) return false;

    dispatch('activateAction', { actionId: nextPrimaryAction.id });

    return true;
  },

  /**
   * Activate the previous action in a step, before a specific action ID
   *
   * @param {{ actionId: string; }} payload
   * @returns {boolean}
   */
  activatePreviousPrimaryAction(
    { dispatch, getters },
    payload: { actionId: string }
  ): boolean {
    if (!payload || !payload.actionId) return false;

    const previousAction: Action.Any | false = getters.previousPrimaryAction(
      payload.actionId
    );

    if (!previousAction) return false;

    dispatch('activateAction', { actionId: previousAction.id });

    return true;
  },

  /**
   * Activate an action, of a specific ID
   *
   * @param {{ actionId: string }} payload
   * @returns {boolean}
   */
  activateAction(
    { state, commit, dispatch, getters },
    payload: { actionId: string }
  ): boolean {
    if (!payload || !payload.actionId) return false;

    if (state.activeActionValue) commit('setActiveActionValue', null);

    if (state.activeActionId !== payload.actionId) {
      commit('setActiveActionId', payload.actionId);

      const action = getters.actionFromId(payload.actionId);

      if (action.type.toLowerCase() === 'actionset') {
        dispatch('activateActionSet', { actionSetId: payload.actionId });
      } else {
        dispatch('deactivateActionSets');
      }
    }

    dispatch('deactivateSteps', { onlyIntroOutro: true });

    dispatch('deactivateTasks', { onlyIntroOutro: true });

    return true;
  },

  /**
   * Deactivate all actions
   */
  deactivateActions({ state, commit, dispatch }) {
    if (state.activeActionValue) commit('setActiveActionValue', null);
    if (state.activeActionId) commit('setActiveActionId', null);
    if (state.activeActionSet) dispatch('deactivateActionSets');
  },
};
