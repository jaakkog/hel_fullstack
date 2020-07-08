
export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
  }

  export type NewPatientEntry = Omit<Patient, 'id'>;

  export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

  export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;

  export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries: Entry[];
  }

  export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;