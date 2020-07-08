import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('working', diagnosesService.getEntries);
    res.send(diagnosesService.getEntries());
});

export default router;