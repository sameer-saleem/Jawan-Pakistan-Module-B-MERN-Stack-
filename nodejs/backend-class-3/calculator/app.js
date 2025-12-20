const readline = require('readline');
const math = require('./math');
const greeting = require('./greetings');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What is your name? ', (answer) => {
    console.log(greeting(answer));

    rl.question('Enter first number? ', (first) => {
       
        rl.question('Enter first number? ', (second) => {
            const num1 = parseFloat(first);
            const num2 = parseFloat(second);

            console.log(math.add(num1, num2));
            console.log(math.sub(num1, num2));
            console.log(math.mul(num1, num2));
            console.log(math.divi(num1, num2));

        });

    });

});

