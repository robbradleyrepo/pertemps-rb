import { Task, Registration } from '~/types';
import { ActionTree } from 'vuex';
import Get from 'lodash/get';

export default <ActionTree<Registration.State, Registration.State>>{
  /**
   * Activate the first task in the flow
   * Optionally force the task intro to be shown
   *
   * @param {{ forceShowIntro?: boolean }} [payload]
   * @returns {boolean}
   */
  activateFirstTask(
    { dispatch, getters },
    payload?: { forceShowIntro?: boolean }
  ): boolean {
    const firstTask: Task.Single | null = getters.firstTaskOfFlow;

    if (!firstTask) return false;

    const forceShowIntro = Get(payload, 'forceShowIntro') || false;

    dispatch('activateTask', {
      taskId: firstTask.id,
      forceShowIntro,
    });

    return true;
  },

  /**
   * Activate the next task in the flow, after a specified task ID
   * Optionally force the task intro to be shown
   *
   * @param {{ taskId: string; forceShowIntro?: boolean }} payload
   * @returns {boolean}
   */
  activateNextTask(
    { dispatch, getters },
    payload: { taskId: string; forceShowIntro?: boolean }
  ): boolean {
    if (!payload || !payload.taskId) return false;

    const nextTask: Task.Single | false = getters.nextTask(payload.taskId);

    if (!nextTask) return false;

    const forceShowIntro = Get(payload, 'forceShowIntro') || false;

    dispatch('activateTask', {
      taskId: nextTask.id,
      forceShowIntro,
    });

    return true;
  },

  /**
   * Activate a task, of a specific ID
   * Deactivate other steps and actions
   * Optionally force the task intro to be shown
   *
   * @param {{ taskId: string; forceShowIntro?: boolean }} payload
   * @returns {boolean}
   */
  activateTask(
    { state, commit, dispatch },
    payload: { taskId: string; forceShowIntro?: boolean }
  ): boolean {
    if (!payload || !payload.taskId) return false;

    dispatch('deactivateActions');

    dispatch('deactivateSteps');

    if (payload.forceShowIntro && payload.forceShowIntro === true) {
      dispatch('activateTaskIntro');
    } else {
      dispatch('deactivateTaskIntro');
    }

    if (state.activeTaskId !== payload.taskId) {
      commit('setActiveTaskId', payload.taskId);
    }

    return true;
  },

  /**
   * Activate task intro
   */
  activateTaskIntro({ state, commit }) {
    if (state.taskIntroIsActive !== true) commit('setTaskIntroActive', true);
  },

  /**
   * Deactivate task intro
   */
  deactivateTaskIntro({ state, commit }) {
    if (state.taskIntroIsActive) commit('setTaskIntroActive', false);
  },

  /**
   * Deactivate all tasks
   */
  deactivateTasks(
    { state, commit, dispatch },
    payload?: { onlyIntroOutro?: boolean }
  ) {
    const onlyIntroOutro = (payload && payload.onlyIntroOutro) || false;

    dispatch('deactivateTaskIntro');

    if (onlyIntroOutro !== true && state.activeTaskId) {
      commit('setActiveTaskId', null);
    }
  },
};
