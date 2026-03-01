// 1. Convert the function below to an arrow function and make it return the square of a number:

// function square(n) {
//   return n * n;
// }

// const square = (n) => {
//     return n * n;
// }

// console.log(square(4+5));


// 2. Rest Parameter Sum - Write a function using rest parameters that returns the sum of all numbers passed.

const sum = (...total) => {

    let val = 0;
    for (let item of total) {
        val += item;
    }

    return val;

    // const arr = [1,2,3,1,4,5,6,9,10];
    // console.log(new Set(arr));
}

console.log(sum(4, 8, 10), 'Sum');