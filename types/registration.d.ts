import { Consultant, Candidate, Branch, Flow, Action } from '~/types';

export namespace Registration {
  // export namespace Status {
  //   export interface ActionDetails {
  //     value: string | null;
  //     valid: boolean;
  //   }

  //   export interface Action {
  //     [propName: string]: ActionDetails;
  //   }

  //   export interface StepDetails {
  //     actions: Action;
  //     complete: boolean;
  //   }

  //   export interface Step {
  //     [propName: string]: StepDetails;
  //   }

  //   export interface TaskDetails {
  //     steps: Step;
  //     complete: boolean;
  //   }

  //   export interface Task {
  //     [propName: string]: TaskDetails;
  //   }
  // }

  export interface ApiData {
    readonly id: string;
    readonly title?: string; // Only in `/ConsultantDashboard/` API
    readonly status: string;
    readonly branch: Branch.Single;
    readonly consultant?: Consultant.User;
    readonly candidate?: Candidate.User;
    readonly flow?: Flow.Single;
  }

  export interface State {
    apiStatus?: Registration.ApiData | null;

    actionValues?: Action.SubmitValue.Any | null;

    flowOutroIsActive?: boolean;

    activeTaskId?: string | null;
    taskIntroIsActive?: boolean;

    activeStepId?: string | null;
    stepIntroIsActive?: boolean;
    stepOutroIsActive?: boolean;

    activeActionId?: string | null;
    activeActionValue?: Action.InputValue.Any | null;
    activeDependencyActionId?: string | null;

    activeActionSet?: Action.ActionSet | null;
    activeActionSetAction?: Action.Any | null;
    activeActionSetLoop?: number | null;
  }
}
