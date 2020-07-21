import { Action } from '~/types';

export namespace Step {
  export interface Single {
    readonly id: string;
    readonly type: string;
    readonly name: string;
    readonly label: string;
    readonly title: string;
    readonly showIntroductionScreen: boolean;
    readonly showSummaryScreen: boolean;
    readonly description?: string;
    readonly actions: Action.Any[];
    highlightColour?: string;
    parentTaskId?: string;
  }
}
