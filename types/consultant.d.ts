import { Branch } from '~/types';

export namespace Consultant {
  export interface User {
    readonly id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly role: 'ConsultantType1' | 'ConsultantType2';
    readonly Branches?: Branch.Single[]; // Only in `/ConsultantLogin/` API
  }

  export interface State {
    auth: User | null;
  }
}
