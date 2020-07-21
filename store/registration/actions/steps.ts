import { Step, Registration } from '~/types';
import { ActionTree } from 'vuex';
import Get from 'lodash/get';

export default <ActionTree<Registration.State, Registration.State>>{
  /**
   * Activate the first step in a task, of a specific task ID
   * Optionally force the step intro to be shown
   *
   * @param {{ taskId: string; forceShowIntro?: boolean }} payload
   * @returns {boolean}
   */
  activateFirstStepOfTask(
    { dispatch, getters },
    payload: { taskId: string; forceShowIntro?: boolean }
  ): boolean {
    if (!payload || !payload.taskId) return false;

    const firstStep: Step.Single | false = getters.firstStepOfTask(
      payload.taskId
    );

    if (!firstStep) return false;

    const forceShowIntro = Get(payload, 'forceShowIntro') || false;

    dispatch('activateStep', {
      stepId: firstStep.id,
      forceShowIntro,
    });

    return true;
  },

  /**
   * Activate the next step in a task, after a specific step ID
   * Optionally force the step intro to be shown
   *
   * @param {{ stepId: string; forceShowIntro?: boolean }} payload
   * @returns {boolean}
   */
  activateNextStep(
    { dispatch, getters },
    payload: { stepId: string; forceShowIntro?: boolean }
  ): boolean {
    if (!payload || !payload.stepId) return false;

    const nextStep: Step.Single | false = getters.nextStep(payload.stepId);

    if (!nextStep) return false;

    const forceShowIntro =
      Get(payload, 'forceShowIntro') ||
      nextStep.showIntroductionScreen ||
      false;

    dispatch('activateStep', {
      stepId: nextStep.id,
      forceShowIntro,
    });

    return true;
  },

  /**
   * Activate a step, of a specific ID
   * Deactivate other actions
   * Optionally force the step intro to be shown
   *
   * @param {{ stepId: string; forceShowIntro?: boolean }} payload
   * @returns {boolean}
   */
  activateStep(
    { state, commit, dispatch, getters },
    payload: { stepId: string; forceShowIntro?: boolean }
  ): boolean {
    if (!payload || !payload.stepId) return false;

    const step = getters.stepFromId(payload.stepId);

    if (!step) return false;

    const forceShowIntro = Get(payload, 'forceShowIntro') || false;

    dispatch('deactivateActions');

    if (forceShowIntro === true || step.showIntroductionScreen === true) {
      dispatch('activateStepIntro');
    } else {
      dispatch('deactivateStepIntro');
    }

    dispatch('deactivateStepOutro');

    if (state.activeStepId !== payload.stepId) {
      commit('setActiveStepId', payload.stepId);
    }

    dispatch('deactivateTasks', { onlyIntroOutro: true });

    return true;
  },

  /**
   * Activate step intro
   */
  activateStepIntro({ state, commit }) {
    if (state.stepIntroIsActive !== true) commit('setStepIntroActive', true);
  },

  /**
   * Deactivate step intro
   */
  deactivateStepIntro({ state, commit }) {
    if (state.stepIntroIsActive) commit('setStepIntroActive', false);
  },

  /**
   * Activate step outro
   */
  activateStepOutro({ state, commit }) {
    if (state.stepOutroIsActive !== true) commit('setStepOutroActive', true);
  },

  /**
   * Deactivate step outro
   */
  deactivateStepOutro({ state, commit }) {
    if (state.stepOutroIsActive) commit('setStepOutroActive', false);
  },

  /**
   * Deactivate all steps
   */
  deactivateSteps(
    { state, commit, dispatch },
    payload?: { onlyIntroOutro?: boolean }
  ) {
    const onlyIntroOutro = (payload && payload.onlyIntroOutro) || false;

    dispatch('deactivateStepIntro');
    dispatch('deactivateStepOutro');

    if (onlyIntroOutro !== true && state.activeStepId) {
      commit('setActiveStepId', null);
    }
  },
};
