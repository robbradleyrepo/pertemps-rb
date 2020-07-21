import { Task, Step, Registration } from '~/types';
import { GetterTree } from 'vuex';
import Get from 'lodash/get';

export default <GetterTree<Registration.State, Registration.State>>{
  /**
   * Get all tasks in the flow
   *
   * @returns {(Task.Single[] | null)}
   */
  allTasks(state: Registration.State): Task.Single[] | null {
    return Get(state, 'apiStatus.flow.tasks');
  },

  /**
   * Get whole task object from its ID
   *
   * @param {string} taskId
   * @returns {(Task.Single | null)}
   */
  taskFromId: (_state: Registration.State, getters: any): {} => (
    taskId: string
  ): Task.Single | null => {
    if (!taskId || !getters.allTasks) return null;

    return (
      getters.allTasks.find((task: Task.Single) => task.id === taskId) || null
    );
  },

  /**
   * Get the currently active task object
   *
   * @returns {(Task.Single | null)}
   */
  activeTaskObject(
    state: Registration.State,
    getters: any
  ): Task.Single | null {
    if (!state.activeTaskId) return null;

    return getters.taskFromId(state.activeTaskId);
  },

  /**
   * Get index of task from the task ID
   *
   * @param {string} taskId
   * @returns {(number | false)}
   */
  taskIndex: (_state: Registration.State, getters: any): {} => (
    taskId: string
  ): number => {
    if (!taskId || !getters.allTasks) return -1;

    return getters.allTasks.findIndex(
      (task: Task.Single) => task.id === taskId
    );
  },

  /**
   * Get the next task after a specified ID
   *
   * @param {string} taskId
   * @returns {(Task.Single | false)}
   */
  nextTask: (_state: Registration.State, getters: any): {} => (
    taskId: string
  ): Task.Single | false => {
    if (!taskId) return false;

    const taskIndex: number = getters.taskIndex(taskId);

    if (taskIndex > -1) {
      return getters.allTasks[taskIndex + 1];
    } else {
      return false;
    }
  },

  /**
   * Get the first task of the current flow
   *
   * @returns {(Task.Single | false)}
   */
  firstTaskOfFlow(
    _state: Registration.State,
    getters: any
  ): Task.Single | null {
    if (!getters.allTasks) return null;

    return getters.allTasks[0] || null;
  },

  /**
   * Get parent task of step from the step ID
   *
   * @param {string} stepId
   * @returns {(Task.Single | false)}
   */
  parentTaskOfStep: (_state: Registration.State, getters: any): {} => (
    stepId: string
  ): Task.Single | false => {
    if (!stepId || !getters.allTasks) return false;

    const step: Step.Single | null = getters.stepFromId(stepId);

    if (!step) return false;

    let parentTask: Task.Single | null | undefined;

    if (step.parentTaskId) {
      parentTask = getters.taskFromId(step.parentTaskId);
    } else {
      parentTask = getters.allTasks.find((task: Task.Single) => {
        return task.steps.some((step: Step.Single) => {
          return step.id === stepId;
        });
      });
    }

    return parentTask || false;
  },
};
