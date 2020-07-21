import { Task } from '~/types';

export namespace Flow {
  export interface Single {
    id: string;
    title: string;
    description: string;
    tasks: Task.Single[];
  }
}
