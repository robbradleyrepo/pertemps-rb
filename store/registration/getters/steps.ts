import { Task, Step, Action, Registration } from '~/types';
import { GetterTree } from 'vuex';

export default <GetterTree<Registration.State, Registration.State>>{
  /**
   * Get all steps in the flow
   * Add parentTaskId to the step object
   *
   * @returns {(Step.Single[] | null)}
   */
  allSteps(_state: Registration.State, getters: any): Step.Single[] | null {
    if (!getters.allTasks) return null;

    return (
      [].concat(
        ...getters.allTasks.map((task: Task.Single) => {
          return task.steps.map((step) => {
            step.parentTaskId = task.id;
            return step;
          });
        })
      ) || null
    );
  },

  /**
   * Get whole step object from its ID
   *
   * @param {string} stepId
   * @returns {(Step.Single | null)}
   */
  stepFromId: (_state: Registration.State, getters: any): {} => (
    stepId: string
  ): Step.Single | null => {
    if (!stepId || !getters.allSteps) return null;

    return getters.allSteps.find((step: Step.Single) => step.id === stepId);
  },

  /**
   * Get the currently active step object
   *
   * @returns {(Step.Single | null)}
   */
  activeStepObject(
    state: Registration.State,
    getters: any
  ): Step.Single | null {
    if (!state.activeStepId) return null;

    return getters.stepFromId(state.activeStepId);
  },

  /**
   * Get index of step from the step ID
   *
   * @param {string} stepId
   * @returns {(number | false)}
   */
  stepIndex: (_state: Registration.State, getters: any): {} => (
    stepId: string
  ): number | false => {
    if (!stepId) return false;

    const parentTask: Task.Single | null = getters.parentTaskOfStep(stepId);

    if (!parentTask || !parentTask.steps) return false;

    const stepIndex = parentTask.steps.findIndex(
      (step: Step.Single) => step.id === stepId
    );

    return stepIndex > -1 ? stepIndex : false;
  },

  /**
   * Get the next step after a specified step ID
   *
   * @param {string} stepId
   * @returns {(Step.Single | false)}
   */
  nextStep: (_state: Registration.State, getters: any): {} => (
    stepId: string
  ): Step.Single | false => {
    if (!stepId) return false;

    const parentTask: Task.Single | null = getters.parentTaskOfStep(stepId);

    if (!parentTask || !parentTask.steps) return false;

    const stepIndex: number | false = getters.stepIndex(stepId);

    if (typeof stepIndex !== 'number') return false;

    return parentTask.steps[stepIndex + 1] || false;
  },

  /**
   * Get the first step of a specified task
   *
   * @param {string} taskId
   * @returns {(Step.Single | false)}
   */
  firstStepOfTask: (_state: Registration.State, getters: any): {} => (
    taskId: string
  ): Step.Single | false => {
    if (!taskId) return false;

    const task: Task.Single | null = getters.taskFromId(taskId);

    if (!task || !task.steps) return false;

    return task.steps[0] || false;
  },

  /**
   * Get parent step of action from the step ID
   *
   * @param {string} actionId
   * @returns {(Step.Single | false)}
   */
  parentStepOfAction: (_state: Registration.State, getters: any): {} => (
    actionId: string
  ): Step.Single | false => {
    if (!actionId) return false;

    const action: Action.Any | false = getters.actionFromId(actionId);

    if (!action || !action.parentStepId) return false;

    const parentStep: Step.Single | false = getters.stepFromId(
      action.parentStepId
    );

    return parentStep || false;
  },
};
