const readline = require('readline');
const calculator = require('./calculator');
const greeting = require('./greetings');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(`Hello!, What's your name? `, (answer) => {
    console.log(greeting(answer));

    rl.question(`Enter your first subject's marks? `, (sub1) => {

        rl.question(`Enter your second subject's marks? `, (sub2) => {

            rl.question(`Enter your third subject's marks? `, (sub3) => {

                rl.question(`Enter your fourth subject's marks? `, (sub4) => {

                    rl.question(`Enter your fifth subject's marks? `, (sub5) => {

                        rl.question(`Enter total marks? `, (total) => {

                            subMarks1 = parseFloat(sub1);
                            subMarks2 = parseFloat(sub2);
                            subMarks3 = parseFloat(sub3);
                            subMarks4 = parseFloat(sub4);
                            subMarks5 = parseFloat(sub5);

                            totalMarks = parseFloat(total);

                            const stdobtainedMarks = calculator.obtainedMarksFunc(subMarks1, subMarks2, subMarks3, subMarks4, subMarks5);
                            const percent = calculator.percentage(stdobtainedMarks, totalMarks);
                            const grade = calculator.grade(percent);

                            console.log(`
    Hello, ${answer}, Here is your result:
    Grade: ${grade}
    Percentage: ${percent}%
    Marks: ${stdobtainedMarks}/${totalMarks}`
                            );

                            rl.close();

                        });

                    });

                });

            });

        });
    });

});

