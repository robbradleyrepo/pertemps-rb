export namespace Action {
  // -------------------------
  // Base
  // -------------------------
  interface Base {
    readonly id: string;
    readonly name: string;
    readonly label: string;
    readonly placeholder: string;
    readonly title: string;
    readonly type: string;
    readonly required: boolean;
    readonly pattern: string;
    readonly description: string;
    readonly choices?: Choice;
    readonly actions?: Action.Any[];
    readonly value?: InputValue.Any | ActionSetValue[];
    parentTaskId?: string;
    parentStepId?: string;
    parentActionId?: string;
    rootActionId?: string;
    parentActionSetId?: string;
    actionDepth?: number;
    hasDependencyQuestions?: boolean;
    isDependencyQuestion?: boolean;
    parentDependentAnswer?: string;
  }

  // -------------------------
  // Object values
  // -------------------------
  export interface ChoiceSpecify {
    readonly title: string;
    readonly label: string;
    readonly placeholder: string;
  }

  export interface ChoiceSingle {
    readonly text: string;
    readonly value: string;
    readonly pleaseSpecifyChoices?: ChoiceSpecify;
    readonly dependencyQuestions?: Action.Any[];
    key?: string;
    keyIndex?: string;
  }

  export interface Choice {
    readonly isDropdownDisplayOrNot: boolean;
    readonly choicesList: ChoiceSingle[];
  }

  export interface LocationValue {
    readonly Lat: string;
    readonly Lon: string;
    readonly Fullstr: string;
    readonly Address1: string;
    readonly Address2: string;
    readonly Address3: string;
    readonly Address4: string;
    readonly PostCode: string;
    readonly City: string;
    readonly County: string;
    readonly Country: string;
  }

  export interface ActionSetValue {
    [propName: number]: {
      [propName: string]: InputValue.Any;
    };
  }

  // -------------------------
  // Action types
  // -------------------------
  export interface Text extends Base {
    readonly value?: InputValue.Text;
  }

  export interface Textarea extends Base {
    readonly value?: InputValue.Textarea;
  }

  export interface Email extends Base {
    readonly value?: InputValue.Email;
  }

  export interface Date extends Base {
    readonly value?: InputValue.Date;
  }

  export interface StartEndDate extends Base {
    readonly value?: InputValue.StartEndDate;
  }

  export interface Number extends Base {
    readonly min?: number;
    readonly max?: number;
    readonly step?: number;
    readonly value?: InputValue.Number;
  }

  export interface Checkbox extends Base {
    readonly choices: Choice;
    readonly value?: InputValue.Checkbox;
  }

  export interface Radio extends Base {
    readonly choices: Choice;
    readonly value?: InputValue.Radio;
  }

  export interface Select extends Base {
    readonly choices: Choice;
    readonly value?: InputValue.Select;
  }

  export interface Location extends Base {
    readonly value?: InputValue.Location;
  }

  export interface LocationDistance extends Base {
    readonly min?: number;
    readonly max?: number;
    readonly step?: number;
    readonly value?: InputValue.LocationDistance;
  }

  export interface File extends Base {
    readonly accept?: string;
    readonly value?: InputValue.File;
  }

  export interface Sign extends Base {
    readonly value?: InputValue.Sign;
  }

  export interface Salary extends Base {
    readonly value?: InputValue.Salary;
  }

  export interface Phone extends Base {
    readonly value?: InputValue.Phone;
  }

  export interface ActionSet extends Base {
    readonly value?: ActionSetValue;
    readonly actions: Action.Any[];
  }

  export type Any =
    | Text
    | Textarea
    | Email
    | Date
    | StartEndDate
    | Number
    | Checkbox
    | Radio
    | Select
    | Location
    | LocationDistance
    | File
    | Sign
    | Salary
    | Phone
    | ActionSet;

  // -------------------------
  // Submit values
  // -------------------------
  export namespace SubmitValue {
    export interface Text {
      // [propName: string]: string;
      [propName: string]: string | boolean; // Temporary for 'swipe to sign'
    }

    export interface TextArray {
      [propName: string]: string[];
    }

    export interface Number {
      [propName: string]: number;
    }

    export interface File {
      [propName: string]: FileList | [];
    }

    export interface Location {
      [propName: string]: Action.LocationValue;
    }

    export interface ActionSet {
      [propName: string]: Action.ActionSetValue;
    }

    export type Any = Text | TextArray | Number | File | Location | ActionSet;
  }

  // -------------------------
  // Input values
  // -------------------------
  export interface LocationInputValueObject {
    Lat?: string;
    Lon?: string;
    Fullstr?: string;
    Address1?: string;
    Address2?: string;
    Address3?: string;
    Address4?: string;
    PostCode?: string;
    City?: string;
    County?: string;
    Country?: string;
  }

  export interface StartEndDateInputValueObject {
    startDate?: Date;
    endDate?: Date;
  }

  export namespace InputValue {
    export type Text = string;
    export type Textarea = string;
    export type Email = string;
    export type Date = string;
    export type StartEndDate = StartEndDateInputValueObject;
    export type Number = number;
    export type Checkbox = string[];
    export type Radio = string;
    export type Select = string;
    export type Location = LocationInputValueObject;
    export type LocationDistance = number;
    export type File = FileList | [];
    export type Sign = string | boolean;
    export type Salary = string | number;
    export type Phone = string;

    export type Any =
      | Text
      | Textarea
      | Email
      | Date
      | StartEndDate
      | Number
      | Checkbox
      | Radio
      | Select
      | Location
      | LocationDistance
      | File
      | Sign
      | Salary
      | Phone;
  }
}
