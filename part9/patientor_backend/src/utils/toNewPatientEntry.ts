/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender } from '../../types';

  const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

  const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    } 
    return gender;
  };

  const parseName = (name: any): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name: ' + name);
    }
     return name;
  };
  const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation: ' + occupation);
    }
  
    return occupation;
  };
  const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn: ' + ssn);
    }
  
    return ssn;
  };
  const parseDateOfBirth = (DateOfBirth: any): string => {
    if (!DateOfBirth || !isString(DateOfBirth)) {
      throw new Error('Incorrect or missing Date of Birth: ' + DateOfBirth);
    }
  
    return DateOfBirth;
  };

  const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
      name: parseName(object.name),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender),
      ssn: parseSsn(object.ssn),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    };
    };


export default toNewPatientEntry;