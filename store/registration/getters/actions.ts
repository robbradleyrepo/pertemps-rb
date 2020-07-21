import { GetterTree } from 'vuex';
import { Step, Action, Registration } from '~/types';

export default <GetterTree<Registration.State, Registration.State>>{
  /**
   * Get all primary actions in the flow (excluding dependencies)
   * Add parentStepId and parentTaskId to the action object
   *
   * @returns {(Action.Any[] | null)}
   */
  allPrimaryActions(
    _state: Registration.State,
    getters: any
  ): Action.Any[] | null {
    if (!getters.allSteps) return null;

    return [].concat(
      ...getters.allSteps.map((step: Step.Single) => {
        return step.actions.map((action) => {
          action.parentStepId = step.id;
          action.parentTaskId = step.parentTaskId;
          return action;
        });
      })
    );
  },

  /**
   * Get all actions in the flow (including dependencies)
   *
   * @returns {(Action.Any[] | null)}
   */
  allActionsWithDependencies(
    _state: Registration.State,
    getters: any
  ): Action.Any[] | null {
    if (!getters.allPrimaryActions) return null;

    const allActions: Action.Any[] = [];

    const actionMapper = (action: Action.Any) => {
      if (typeof action.actionDepth !== 'number') {
        action.actionDepth = 0;
      }

      allActions.push(action);

      const rootActionId = action.rootActionId || action.id;

      if (action.type.toLowerCase() === 'actionset' && action.actions) {
        action.actions.map((actionSetAction) => {
          actionSetAction.parentActionSetId = action.id;
        });
      }

      if (action.choices && action.choices.choicesList) {
        action.choices.choicesList.map((choice) => {
          if (
            choice.dependencyQuestions &&
            choice.dependencyQuestions.length > 0
          ) {
            const dependencyQuestions = choice.dependencyQuestions;

            action.hasDependencyQuestions = true;

            dependencyQuestions.map((question) => {
              question.isDependencyQuestion = true;
              question.parentDependentAnswer = choice.value;
              question.parentActionId = action.id;
              question.rootActionId = rootActionId;

              if (typeof action.actionDepth === 'number') {
                question.actionDepth = action.actionDepth + 1;
              }

              if (action.parentTaskId) {
                question.parentTaskId = action.parentTaskId;
              }

              if (action.parentStepId) {
                question.parentStepId = action.parentStepId;
              }
            });

            dependencyQuestions.map(actionMapper);
          }
        });
      }
    };

    getters.allPrimaryActions.map(actionMapper);

    return allActions;
  },

  /**
   * Get whole action object from its ID
   *
   * @param {string} actionId
   * @returns {(Action.Any | null)}
   */
  actionFromId: (_state: Registration.State, getters: any): {} => (
    actionId: string
  ): Action.Any | null => {
    if (!actionId || !getters.allPrimaryActions) return null;

    return getters.allActionsWithDependencies.find(
      (action: Action.Any) => action.id === actionId
    );
  },

  /**
   * Get the currently active action object
   *
   * @returns {(Action.Any | null)}
   */
  activeActionObject(
    state: Registration.State,
    getters: any
  ): Action.Any | null {
    if (!state.activeActionId) return null;

    return getters.actionFromId(state.activeActionId);
  },

  /**
   * Get index of action within a step from the action ID
   *
   * @param {string} actionId
   * @returns {(number | false)}
   */
  actionIndexOfStep: (_state: Registration.State, getters: any): {} => (
    actionId: string
  ): number | false => {
    if (!actionId) return false;

    const parentStep: Step.Single | null = getters.parentStepOfAction(actionId);

    if (!parentStep || !parentStep.actions) return false;

    const action: Action.Any | null = getters.actionFromId(actionId);

    let rootAction: Action.Any | null = null;
    let rootActionId: string | null = null;

    if (action && action.rootActionId) {
      rootAction = getters.actionFromId(action.rootActionId);
    }

    rootActionId = rootAction && rootAction.id ? rootAction.id : actionId;

    const actionIndex = parentStep.actions.findIndex(
      (action: Action.Any) => action.id === rootActionId
    );

    return actionIndex > -1 ? actionIndex : false;
  },

  /**
   * Get index of action within an action from the action ID
   *
   * @param {string} actionId
   * @returns {(number | null)}
   */
  // actionIndexOfAction: (_state: Registration.State, getters: any): {} => (
  //   actionId: string
  // ): number | null => {
  //   if (!actionId) return null;

  //   const parentAction: Action.Any | null = getters.parentActionOfAction(
  //     actionId
  //   );

  //   if (!parentAction) return null;

  //   const parentActionValue = getters.actionValue(parentAction.id);

  //   const childActions = getters.allChildActionsOfAction({
  //     actionId: parentAction.id,
  //     value: parentActionValue,
  //   });

  //   if (!childActions) return null;

  //   const actionIndex = childActions.findIndex(
  //     (action: Action.Any) => action.id === actionId
  //   );

  //   return actionIndex > -1 ? actionIndex : null;
  // },

  /**
   * Get the next primary action after a specified action ID
   *
   * @param {string} actionId
   * @returns {(Action.Any | false)}
   */
  nextPrimaryAction: (_state: Registration.State, getters: any): {} => (
    actionId: string
  ): Action.Any | false => {
    if (!actionId) return false;

    const parentStep: Step.Single | null = getters.parentStepOfAction(actionId);

    if (!parentStep || !parentStep.actions) return false;

    const actionIndex: number | false = getters.actionIndexOfStep(actionId);

    if (typeof actionIndex !== 'number') return false;

    return parentStep.actions[actionIndex + 1] || false;
  },

  /**
   * Get the next sibling dependency action of a specified action ID
   *
   * @param {string} actionId
   * @returns {(Action.Any | null)}
   */
  // nextSiblingDependencyAction: (
  //   _state: Registration.State,
  //   getters: any
  // ): {} => (actionId: string): Action.Any | null => {
  //   if (!actionId) return null;

  //   const parentAction: Action.Any | null = getters.parentActionOfAction(
  //     actionId
  //   );

  //   if (!parentAction) return null;

  //   const parentActionValue = getters.actionValue(parentAction.id);

  //   const childActions = getters.allChildActionsOfAction({
  //     actionId: parentAction.id,
  //     value: parentActionValue,
  //   });

  //   if (!childActions) return null;

  //   const actionIndex: number | null = getters.actionIndexOfAction(actionId);

  //   if (typeof actionIndex !== 'number') return null;

  //   return childActions[actionIndex + 1] || null;
  // },

  /**
   * Get the previous primary action after a specified ID
   *
   * @param {string} actionId
   * @returns {(Action.Any | false)}
   */
  previousPrimaryAction: (state: Registration.State, getters: any): {} => (
    actionId: string
  ): Action.Any | false => {
    if (!state.apiStatus || !actionId) return false;

    const parentStep: Step.Single | false = getters.parentStepOfAction(
      actionId
    );

    if (!parentStep) return false;

    const actions: Action.Any[] = parentStep.actions;
    const actionIndex: number | null = getters.actionIndexOfStep(actionId);

    if (!actionIndex || actionIndex <= 0) return false;

    return actions[actionIndex - 1];
  },

  /**
   * Get index of the currently active action
   *
   * @returns {(number | null)}
   */
  activeActionIndex(state: Registration.State, getters: any): number | null {
    return state.activeActionId
      ? getters.actionIndexOfStep(state.activeActionId)
      : null;
  },

  /**
   * Get state value of action
   *
   * @param {string} actionId
   * @returns {(Action.InputValue.Any | null)}
   */
  actionValue: (state: Registration.State): {} => (
    actionId: string
  ): Action.InputValue.Any | null => {
    // console.log('getter', state.actionValues, actionId);
    if (!state.actionValues || !actionId) return null;

    return state.actionValues[actionId] || null;
  },

  /**
   * Get state value of currently-active action
   *
   * @returns {(Action.InputValue.Any | null)}
   */
  // activeActionValue(
  //   state: Registration.State,
  //   getters: any
  // ): Action.InputValue.Any | null {
  //   if (!state.activeActionId) return null;

  //   return getters.actionValue(state.activeActionId);
  // },

  /**
   * Get an array of only primary actions, excluding dependency questions
   *
   * @returns {(Action.Any[] | null)}
   */
  allPrimaryActionsOfStep: (state: Registration.State, getters: any): {} => (
    stepId: string
  ): Action.Any[] | null => {
    if (!state.apiStatus || !stepId) return null;

    const step: Step.Single | null = getters.stepFromId(stepId);

    if (!step || !step.actions) return null;

    return step.actions;
  },

  /**
   * Get an array of all actions, including dependency questions
   *
   * @returns {(Action.Any[] | null)}
   */
  allActionsOfStep: (state: Registration.State, getters: any): {} => (payload: {
    stepId: string;
    onlyCompletedDependencyTrees?: boolean;
  }): Action.Any[] | null => {
    if (!payload || !payload.stepId || !state.apiStatus) return null;

    const primaryActions: Action.Any[] | null = getters.allPrimaryActionsOfStep(
      payload.stepId
    );

    if (!primaryActions) return null;

    const allActions: Action.Any[] = [];

    const reducer = (accumulator: any, action: any) => {
      // Skip over inactive dependency trees
      if (
        payload.onlyCompletedDependencyTrees &&
        payload.onlyCompletedDependencyTrees === true &&
        action.isDependencyQuestion
      ) {
        const parentActionValue = getters.actionValue(action.parentActionId);

        if (parentActionValue !== action.parentDependentAnswer) {
          return accumulator;
        }
      }

      // Only store actions, not choices
      if (action.id) {
        allActions.push(action);
      }

      // Recursively loop through any choices
      if (
        action.choices &&
        action.choices.choicesList &&
        action.choices.choicesList.length > 0
      ) {
        action.choices.choicesList.reduce(reducer, []);
      }

      // Recursively loop through any dependency questions
      if (action.dependencyQuestions && action.dependencyQuestions.length > 0) {
        action.dependencyQuestions.reduce(reducer, []);
      }

      return accumulator;
    };

    primaryActions.reduce(reducer, []);

    return allActions;
  },

  /**
   * Get an array of all child actions of the defined action, one level deep
   *
   * @param {{ actionId: string; value?: string }} payload
   * @returns {(Action.Any[] | null)}
   */
  allChildActionsOfAction: (
    _state: Registration.State,
    getters: any
  ): {} => (payload: {
    actionId: string;
    value?: string;
  }): Action.Any[] | null => {
    if (!payload || !payload.actionId) return null;

    const action: Action.Any | false = getters.actionFromId(payload.actionId);

    if (!action || !action.choices || !action.choices.choicesList) return null;

    const childActions: any = {};

    action.choices.choicesList.map((choice) => {
      if (choice.dependencyQuestions) {
        childActions[choice.value] = choice.dependencyQuestions;
      }
    });

    if (payload.value) {
      return childActions[payload.value] || null;
    }

    const allChildActions: Action.Any[] = Object.values(childActions);

    if (!allChildActions || allChildActions.length <= 0) return null;

    return [].concat(...(allChildActions as any[]));
  },

  /**
   * Get an array of all child actions of the defined action, down to all levels
   * Optionally only include dependencies that have a completed value
   *
   * @param {{ actionId: string; value?: string }} payload
   * @returns {(Action.Any[] | null)}
   */
  allChildActionsRecursive: (
    _state: Registration.State,
    getters: any
  ): {} => (payload: {
    actionId: string;
    onlyCompleted?: string;
  }): Action.Any[] | null => {
    if (!payload || !payload.actionId) return null;

    let allActions: Action.Any[] = [];

    const recurse = (actionId: string) => {
      const actionValue = getters.actionValue(actionId);

      if (payload.onlyCompleted && !actionValue) return;

      const allChildActions = getters.allChildActionsOfAction({
        actionId,
        value: actionValue,
      });

      if (!allChildActions || allChildActions.length <= 0) return;

      allActions = [...allActions, ...allChildActions];

      for (const action of allChildActions) {
        recurse(action.id);
      }
    };

    recurse(payload.actionId);

    return allActions;
  },

  /**
   * Get the first action of a specified step
   *
   * @param {string} stepId
   * @returns {(Action.Any | false)}
   */
  firstActionOfStep: (state: Registration.State, getters: any): {} => (
    stepId: string
  ): Action.Any | false => {
    if (!state.apiStatus || !stepId) return false;

    const step: Step.Single | null = getters.stepFromId(stepId);

    return step ? step.actions[0] : false;
  },

  /**
   * Get the first dependency action of a specified action
   *
   * @param {{ actionId: string; value: string }} payload
   * @returns {(Action.Any | null)}
   */
  firstDependencyOfAction: (
    _state: Registration.State,
    getters: any
  ): {} => (payload: {
    actionId: string;
    value: string;
  }): Action.Any | null => {
    if (!payload || !payload.actionId || !payload.value) return null;

    const childActions: Action.Any[] | null = getters.allChildActionsOfAction(
      payload
    );

    if (!childActions || childActions.length <= 0) return null;

    return childActions[0];
  },

  /**
   * Get parent action of action from the action ID
   *
   * @param {string} actionId
   * @returns {(Action.Any | null)}
   */
  parentActionOfAction: (_state: Registration.State, getters: any): {} => (
    actionId: string
  ): Action.Any | null => {
    if (!actionId) return null;

    const action: Action.Any | false = getters.actionFromId(actionId);

    if (!action || !action.parentActionId) return null;

    const parentAction: Action.Any | false = getters.actionFromId(
      action.parentActionId
    );

    return parentAction || null;
  },
};
