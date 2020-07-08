

export const calculateBmi = (height: number, mass: number) => {

    height = height / 100;

    const bmi = mass / (height ** 2);


    if(bmi < 16) {
        return {
            weight: mass,
            height: height * 100,
            bmi: 'Underweight'
        };
    } else if (bmi > 16 && bmi < 25) {
        return {
            weight: mass,
            height: height * 100,
            bmi: 'Normal'
        };
    } else if (bmi > 25) {
        return {
            weight: mass,
            height: height * 100,
            bmi: 'Overweight'
        };
    } else if (isNaN(bmi) || height == 0 || mass == 0) {
        return {
            error: "malformatted parameters"
        };
    }
    return undefined;

};

const values1 = Number(process.argv[2]);
const values2 = Number(process.argv[3]);

calculateBmi(values1, values2);