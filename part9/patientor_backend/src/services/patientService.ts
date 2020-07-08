import patientData from '../../data/patients.json';
import { v4 as uuid } from 'uuid';

import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../../types';

const id: string = uuid();

const patients: Array<Patient> = patientData as Array<Patient>;

const getEntries = (): Array<Patient> => {
  console.log(patients);
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry [] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    }));
  };

  const findById = (id: string): Patient | undefined => {
    const entry = patients.find(a => a.id === id);
    console.log('entry', entry);
    return entry;
    };
  
  const addEntry = (
    entry: NewPatientEntry
  ): Patient => {
    
  const newPatientEntry = {
    id: id,
    ...entry
  };
  
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
  findById
};