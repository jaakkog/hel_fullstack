/* eslint-disable @typescript-eslint/no-explicit-any */
import { calculateExcercises } from './exerciseCalculator';
import { calculateBmi } from './bmiCalculator';
import express from 'express';

const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    console.log(weight, height);
    res.send(JSON.stringify(calculateBmi(height, weight)));
});


app.post('/exercises', (req, res) => {
    
    const data = req.body;
    const badType = data.daily_exercises.some((x: any) => typeof x === 'string');
  
    if (!data.target || !data.daily_exercises) {
      return res.status(400).json({ 
        error: "parameters missing" 
      });
    
    } else if (typeof data.target !== 'number' || badType === true){
      return res.status(400).json({
        error: "malformatted parameters"
      });
    }

    const results = calculateExcercises(data.target, data.daily_exercises);

    console.log('results', results);

    res.json(results);

    return 0;
});



const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

