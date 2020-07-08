export interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface InitialValues {
    target: number;
    exercises: Array<number>;
}

export const parseArguments = (args: Array<string>): InitialValues => {

    const exer = args.slice(3).map(function(v){return +v;});
    
    return {
        target: Number(args[2]),
        exercises: exer
    };

};

export const calculateExcercises = (target: number, exercises: Array<number>): Result => {
    const sum = exercises.reduce((a, b) => a + b, 0);
    const days = exercises.length;

    const average = sum / days;

    let count = 0;
    for(let i = 0; i < exercises.length; i++){
        if(exercises[i] !== 0)
        count++;
    }

    if (average < target) {
        return {
            periodLength: days,
            trainingDays: count,
            success: false,
            rating: 1,
            ratingDescription: 'Could be better',
            target: target,
            average: average,
        };
    } else if (average === target) {
        return {
            periodLength: days,
            trainingDays: count,
            success: true,
            rating: 2,
            ratingDescription: 'Nice work getting to your target!',
            target: target,
            average: average,
        };
    } else {
        return {
            periodLength: days,
            trainingDays: count,
            success: true,
            rating: 3,
            ratingDescription: 'Fantastic, you broke your target!',
            target: target,
            average: average,
        };
    }


};


const { target, exercises } = parseArguments(process.argv);

console.log(calculateExcercises(target, exercises));