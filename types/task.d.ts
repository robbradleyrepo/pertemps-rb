import { Step } from '~/types';

export namespace Task {
  export interface Single {
    readonly id: string;
    readonly type: string;
    readonly name: string;
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly steps: Step.Single[];
  }
}
