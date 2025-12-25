const express = require('express');
const calculator = require('./calculator');
const router = express.Router();

router.post('/', (req, res) => {

    // const { english, math, physics, computer, biology, totalMarks, name } = req.body;

    // subMarks1 = parseFloat(english);
    // subMarks2 = parseFloat(math);
    // subMarks3 = parseFloat(physics);
    // subMarks4 = parseFloat(computer);

    // const stdTotalMarks = parseFloat(totalMarks);

    // const stdObtainedMarks = calculator.obtainedMarksFunc(subMarks1, subMarks2, subMarks3, subMarks4);
    // const percent = calculator.percentage(stdObtainedMarks, stdTotalMarks);
    // const grade = calculator.grade(percent);

    // const result = {
    //     name: name,
    //     grade: grade,
    //     obtainedMarks: stdObtainedMarks,
    //     percentage: percent + '%',
    // };

    // res.send(result);

    // input 
    // {
    //     "id": 1,
    //     "name": "Sameer Saleem",
    //     "english": 20,
    //     "math": 56,
    //     "physics": 78,
    //     "computer": 98,
    //     "totalMarks": 500
    // }

    // Result 


    //     {
    //     "name": "Sameer Saleem",
    //     "grade": "D",
    //     "obtainedMarks": 252,
    //     "percentage": "50%"
    // }


    const {name, totalMarks, subjects} = req.body;

    const subMarks = Object.values(subjects).map(Number);
    const obtainedMarks = subMarks.reduce((a, b) => a + b, 0);
    const percent = calculator.percentage(obtainedMarks, totalMarks);
    const grade = calculator.grade(percent);

    const result = {
        name: name,
        grade: grade,
        percentage: percent + '%',
        marks: `${ obtainedMarks } / ${ totalMarks }`
    };

    res.send(result);


});

module.exports = router;