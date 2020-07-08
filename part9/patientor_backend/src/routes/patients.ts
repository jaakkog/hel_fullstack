import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/toNewPatientEntry';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('working', _req.params);
    res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
    try {
      const newPatientEntry = toNewPatientEntry(req.body);
        
      const addedEntry = patientService.addEntry(newPatientEntry);
      res.json(addedEntry);
    } catch (e) {
      res.status(400).send(e.message); 
    }
  });

  router.get('/:id', (req, res) => {
    console.log('toimii');
    const patient = patientService.findById(req.params.id);
    console.log('löyty', patientService.findById(req.params.id));
    if (patient) {
      res.send(patient);
    } else {
      console.log('virhe');
    }
  });

export default router;