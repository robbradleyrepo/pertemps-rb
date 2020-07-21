export namespace Candidate {
  export interface User {
    readonly id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly phone: string;
    readonly dob: string;
  }

  export interface State {
    auth: Candidate.User | null;
    registrationId: string;
  }
}
