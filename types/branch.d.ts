export namespace Branch {
  interface CrmDatabase {
    readonly id: number;
    readonly name: string;
  }

  interface RegistrationFlow {
    readonly id: string;
    readonly name: string;
  }

  export interface Single {
    readonly id: string | number;
    readonly name: string;
    readonly crmDatabases?: CrmDatabase[]; // Only in `/ConsultantLogin/` API
    readonly registrationFlows?: RegistrationFlow[]; // Only in `/RegistrationOptions/` API
  }

  export interface Api {
    readonly branches: Single[];
  }
}
