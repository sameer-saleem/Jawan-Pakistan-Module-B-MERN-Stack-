// Global Scope 
// Declare a variable using var outside of any function or block.

var myname = 'Sameer Saleem';

function myfunc(){

}

// Declare a variable using let outside of any function or block.

var myname1 = 'Sameer Saleem 1';

function myfunc1(){

}


// Declare a variable using const outside of any function or block.

let myname2 = 'Sameer Saleem 2';

function myfunc2(){

}

// Log all three variables to the console?  yes

// console.log(myname);
// console.log(myname1);
// console.log(myname2);



// Function Scope
// Create a function and declare a variable using var inside the function.

function hellow() {
    var world = 'my world';
}
// console.log(world);

// Declare a variable using let inside the function.

function hellowWorld() {
    let worldWorld = 'my world';
}
// console.log(worldWorld);

// Declare a variable using const inside the function.

function hellowClass() {
    const worldClass = 'my world';
}
// console.log(worldClass);


// What do you observe?

// a. inside the function variable cannot show outside the function 


// Block Scope:

// Use an if statement and declare a variable using var inside the block.

let state = 0;
if(state == 0) {
    var block = 'string block';
}


// Declare a variable using let inside the block.

let state1 = 1;
if(state1 == 1) {
    let block1= 'string block 1';
}

// Declare a variable using const inside the block.

let state2 = 2;
if(state1 == 2) {
    const block2= 'string block 2';
}

// Try to log all three variables to the console outside the block.

// console.log(block);

// var can get outside the block

// console.log(block1);

// console.log(block2);

// What do you observe?

// let and const cannot get outside the block, it will show error


// Hoisting with var:

// Write code where you log a var variable before it is declared.

// console.log(city);
var city = 'Karachi';

// What value do you get?
// undefined 


// Hoisting with let and const:

// console.log(country);
let country = 'Pakistan';

// Write code where you log a let variable before it is declared.
// Cannot access 'country' before initialization


// console.log(bike);
const bike = '125';

// Cannot access 'bike' before initialization


// Re-declaration:

// Try to declare the same variable name twice using var.

// What happens in each case?

var abc = 'abc';
var abc = 'xyx';
// console.log(abc);

// got the last value xyx


// Try to declare the same variable name twice using let.

// let xyz = 'abc';
// let xyz = 'xyx';
// console.log(abc);

// got error, variable already declared  


// Try to declare the same variable name twice using const.

// const gyh = 'gyh';
// const gyh = 'gyh1';
// console.log(gyh);

// got error, variable already declared  



// Re-assignment:

// Declare a variable using var and assign it a value. Then reassign it a new value.
// What happens in each case?

var value = 'empty string';
value = 'value';

// console.log(value);

// value has been updated

// Declare a variable using let and assign it a value. Then reassign it a new value.

let newValue = 123;
newValue = 789;

// console.log(newValue);

// value has been updated

// Declare a variable using const and assign it a value. Then reassign it a new value.

// const data = 090;
// data = 369;
// console.log(data);

// cannot assign a value to constant variable


// Temporal Dead Zone (TDZ):

// Declare a let variable inside a block but try to log it before the declaration.

// if(game){
//     console.log(game);
//     let game = 'csgo';
// }

// got error game is not defined 


// Declare a const variable inside a block but try to log it before the declaration.

// if(game){
//     console.log(game);
//     const game = 'csgo';
// }

// got error game is not defined 

// What error do you get? Why?

// get variable is not defined error because varibale log first but declared later 


// When to use var, let, and const:


// Write a piece of code to demonstrate a good use case for var.

function varGoodUseCase(){
    var fruit = 'mango';
    // console.log(fruit);
}

// varGoodUseCase();


// Write a piece of code to demonstrate a good use case for let.

let fruit;
function letGoodUseCase(){
    // console.log(fruit);
}

// letGoodUseCase();

// Write a piece of code to demonstrate a good use case for const.

const program = 'web and mobile';
function constGoodUseCase(){
    // console.log(program);
}

// constGoodUseCase();


// String Interpolation:

// Create variables for a person's first name and last name.

let firstname = 'Sameer';
let lastname = 'Saleem';

// Use a template literal to create a full name string and log it to the console.
const fullname = `${firstname} ${lastname}`;
// console.log(fullname);


// Multi-line Strings:

// Use a template literal to create a multi-line string (e.g., an address) and log it to the console.

let address = `Liaquatabad,
Karachi Pakistan`;

// console.log(address);


// Simple Expressions:

// Create variables for two numbers.
let num1 = 10;
let num2 = 20;

// Use a template literal to create a string that includes the sum of the numbers.
// Log the string to the console.

// let sum = `Sum: ${num1 + num2}`;
// console.log(sum);

// Function Calls:
// Create a function that takes two numbers and returns their product.
// Use a template literal to call this function inside a string and log the result to the console.

function numbers(first, second){
    return first + second;
}

let result = `Result ${numbers(100,200)}`;

// console.log(result);


// Creating a Tagged Template:
// Write a simple tag function that takes a template string and logs it.
// Use this tag function with a template literal.

// I don't the tagged template underntand

// Formatting:

// Write a tag function that formats a string by making it uppercase.
// Use this tag function with a template literal and log the result.



// Conditional Logic:

// Create a variable for the current hour.
let currentHour = new Date().getHours();
const message = `Hello, Good ${currentHour < 12 ? 'Morning': 'Afternoon'}`;
// console.log(message);

// Loops within Template Literals:
// Create an array of items (e.g., a shopping list).

const shoppingList = ['Shirt', 'Pent', 'Coat', 'Cap', 'Shoes'];

// Use a template literal to generate an HTML list (<ul> and <li> elements) from the array and log it to the console.

const shoppingItems = `<ul>${shoppingList.map(item => `<li>${item}</li>`).join('\n')} </ul>`;
// console.log(shoppingItems);


// Escaping Backticks:
// Create a string that includes a backtick character using a template literal.

let backticks = `Eascape \``;
// console.log(backticks);


// Nested Template Literals:
// Create nested template literals to build a more complex string, such as a nested HTML structure (e.g., a table with rows and cells).
// Log the result to the console.

const table =
    `<table>
    <tr>
        <td>One</td>
        <td>Two</td>
        <td>Three</td>
    </tr>
    <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
    </tr>
</table>`;

// console.log(table);


// Simple Condition:
// Create a variable age.
// Use the ternary operator to assign a variable canVote the value "Yes" if age is 18 or older, and "No" otherwise.
// Log canVote to the console.

let age = 17;
let canVote = age >= 18 ? 'Yes': 'No';
// console.log(canVote)


// Even or Odd:
// Create a variable number.
// Use the ternary operator to assign a variable evenOrOdd the value "Even" if number is even, and "Odd" if it's odd.
// Log evenOrOdd to the console.

let number = 12;
let evenOrOdd = number % 2 == 0 ? 'Even': 'Odd';
// console.log(evenOrOdd);


// Grade Evaluation:
// Create a variable score.
// Use the ternary operator to assign a variable grade based on the following conditions:
// "A" if score is 90 or above.
// "B" if score is 80 or above.
// "C" if score is 70 or above.
// "D" if score is 60 or above.
// "F" otherwise.
// Log grade to the console.

let score = 50;
let grade = score >= 90 ? 'A': score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F';
// console.log(grade);


// Login Status:
// Create a variable isLoggedIn.
// Use the ternary operator and logical operators to assign a variable statusMessage the value "Welcome back!" if isLoggedIn is true, and "Please log in" if isLoggedIn is false.
// Log statusMessage to the console.

let isLoggedIn = false;
let statusMessage = isLoggedIn ? 'Welcome back!' : 'Please log in';
// console.log(statusMessage);


// Discount Eligibility:
// Create variables isMember and purchaseAmount.
// Use the ternary operator and logical operators to assign a variable discount the value 10% of purchaseAmount if isMember is true and purchaseAmount is greater than 100, and 0 otherwise.
// Log discount to the console.


let isMember = true;
let purchaseAmount = 5000;
let discount = isMember && purchaseAmount > 100 ? purchaseAmount * 10 / 100 : 0;

// console.log(discount);

// Determine Max Value:
// Create a function maxValue(a, b) that returns the larger of the two numbers using the ternary operator.
// ● Call the function with two numbers and log the result.

function maxValue(a, b) {
    return a > b ? `${a} is greater than b value`: b > a ? `${b} is greater than a value` : '';
}

const maxValueResult = maxValue(8,6);
// console.log(maxValueResult);


// Greeting Message:
// Create a function greet(name) that returns a greeting message. If name is not provided (or is an empty string), it should return "Hello, guest!", otherwise, it should return "Hello, [name]!".
// Call the function with and without a name and log the result.


function greet(name) {
    let message = name == '' || name == null ? 'Hello, guest!':  `Hello, ${name}`;
    // console.log(message);
}

greet('Sameer');
greet();


// Mapping Values:
// Create an array of numbers.
// ● Use the map method with a ternary operator to create a new array where each number is doubled if it is even and tripled if it is odd.
// ● Log the new array to the console.

const numbersArr = [1,2,3,4,5,6,7,8,9];


const newArray = numbersArr.map(item => item % 2 ==0 ? item * 2: item % 2 != 0 ? item * 3: '');
// console.log(newArray);

// Filtering Values:
// Create an array of strings.
// Use the filter method with a ternary operator to create a new array that only includes strings with a length greater than 3.
// Log the new array to the console.

const strArr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
let newStrAray = strArr.filter(item => item.length > 3 ? item : '');
// console.log(newStrAray);


// Copying an Array:
// Create an array originalArray with some elements.
// Use the spread operator to create a copy of originalArray called copiedArray.
// ● Log both arrays to the console to verify they are the same but not the same reference.

const originalArray = ['Value 1', 'Value 2', 'Value 3', 'Value 4'];
const copiedArray = [...originalArray];

// console.log(originalArray);
// console.log(copiedArray);
// console.log(originalArray === copiedArray); // not the same  reference because copiedArray is the new array.


// Merging Arrays:
// Create two arrays array1 and array2.
// ● Use the spread operator to create a new array mergedArray that combines the elements of array1 and array2.
// ● Log mergedArray to the console.

const array1 = ['One', 'Two', 'Three', 'Four'];
const array2 = ['Five', 'Six', 'Seven', 'Eight'];
let mergedArray = [...array1, ...array2];
// console.log(mergedArray);


// Adding Elements to an Array:
// ● Create an array numbers with some elements.
// ● Use the spread operator to add a new element at the beginning and at the end of the numbers array.
// ● Log the updated array to the console.

const arrayNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const updatedArray = [89, ...arrayNumbers, 56];
// console.log(updatedArray);


// Copying an Object:
// ● Create an object originalObject with some key-value pairs.
// ● Use the spread operator to create a copy of originalObject called copiedObject.
// ● Log both objects to the console to verify they are the same but not the same reference.

const originalObject = {
    vehicle: 'Bike',
    model: 2025,
    color: 'Black'
};

const copiedObject = { ...originalObject };

// console.log(originalObject);
// console.log(copiedObject);
// console.log(originalObject === copiedObject);


// Merging Objects:
// ● Create two objects object1 and object2 with some overlapping keys.
// ● Use the spread operator to create a new object mergedObject that combines the properties of object1 and object2.
// ● Log mergedObject to the console and note which values are retained for the overlapping keys.

const object1 = {
    fruit: 'Mango',
    weight: '100gm'
};

const object2 = {
    fruit: 'Apple',
    weight: '100gm'
};

const mergedObject = { ...object1, ...object2 };
// console.log(mergedObject);


// Updating Object Properties:
// ● Create an object user with properties name, age, and email.
// ● Use the spread operator to create a new object updatedUser that updates the email property and adds a new address property.
// ● Log the updatedUser object to the console.

const user = {
    name: 'Sameer',
    age: 24,
    email: 'saleemsameer736@gmail.com'
};

const updatedUser = { ...user, email: 'saleemsameer990@gmail.com' };
// console.log(updatedUser);


// Passing Array Elements as Arguments:
// ● Create a function sum(a, b, c) that returns the sum of three numbers.
// ● Create an array numbers with three elements.
// ● Use the spread operator to pass the elements of numbers as arguments to the sum function.
// ● Log the result to the console.

function sum(a, b, c) {
    return a + b + c;
}

const arrayNumElements = [2, 4, 6];
let numbResult = sum(...arrayNumElements);
// console.log(numbResult);


// Combining Multiple Arrays:
// ● Create a function combineArrays that takes any number of arrays as arguments and returns a single array containing all elements.
// ● Use the spread operator inside the function to combine the arrays.
// ● Call the function with multiple arrays and log the result.

const anyNumbersOfArr1 = [12, 14, 16, 18];
const anyNumbersOfArr2 = [18, 19, 21, 85];

function combineArrays(numbArr1, numbArr2) {

    let combineBothArray = [...numbArr1, ...numbArr2];
    console.log(numbArr1, 'numbArr1');
    console.log(numbArr2, 'numbArr2');
    console.log(combineBothArray, 'combineBothArray');
    return combineBothArray;
}

// combineArrays(anyNumbersOfArr1, anyNumbersOfArr2);


// Rest Parameter with Spread Operator:
// ● Create a function multiply that takes a number and any number of additional arguments.
// ● Use the rest parameter to gather the additional arguments into an array and multiply each by the first argument.
// ● Return an array of the results.
// ● Call the function with appropriate arguments and log the result.


function multiply(...number) {
    // console.log(number);
    let result = number.map(item => item * number[0]);
    // console.log(result, 'result');
    return result;
}

multiply(2, 4, 8, 9);
multiply(3, 8, 9, 2);



// Spread Operator with Nested Structures:
// ● Create a nested array nestedArray and use the spread operator to create a shallow copy.
// ● Modify the inner arrays in the copied array.
// ● Log both the original and copied arrays to observe the effect of shallow copying.

const nestedArray = ['val-1', 'val-2', 'val-3', 'val-4', ['val-5', 'val-6', 'val-7'], ['val-9', 'val-10']];
const shallowCopy = [...nestedArray];

shallowCopy[4].push('val-8');


// console.log(nestedArray, 'nestedArray');
// console.log(shallowCopy, 'shallowCopy');
// console.log(nestedArray[4] === shallowCopy[4]);


// Sum Function:
// ● Create a function sum that uses the rest operator to take any number of arguments.
// ● The function should return the sum of all its arguments.
// ● Call the function with different numbers of arguments and log the results.

function sumFunc(...anyNumber) {
    let total = 0;
    anyNumber.map(item => {
        total += item; 
    });
    // console.log(total);
}

sumFunc(2,3,4,5,6,7,8,9,10);


// Average Function:
// ● Create a function average that uses the rest operator to take any number of arguments.
// ● The function should return the average of all its arguments.
// ● Call the function with different numbers of arguments and log the results.

average = (...anyAvgNumb) => {
    let total = 0;
    anyAvgNumb.map(item => {
        total += item; 
    });
    // console.log(total);
    let averageVal = total / anyAvgNumb.length
    // console.log(averageVal, 'Average');
}

average(2, 3, 4, 5, 6, 7, 8, 10);


// First and Rest:
// ● Create an array numbers with at least 5 elements.
// ● Use array destructuring with the rest operator to assign the first element to a variable first and the remaining elements to a variable rest.
// ● Log first and rest to the console.

const numbersArrFR = [1,2,3,4,5];
// let [first, ...rest] = numbersArrFR;
// console.log(first);
// console.log(rest);


// Skip and Rest:
// ● Create an array colors with at least 5 elements.
// ● Use array destructuring with the rest operator to skip the first two elements and assign the remaining elements to a variable remainingColors.
// ● Log remainingColors to the console.

const colorsArr = ['Green', 'Red', 'Blue', 'Yellow', 'Purple'];
let [, , ...remainingColors] = colorsArr;
// console.log(remainingColors);


// Basic Destructuring:
// ● Create an object person with properties name, age, email, and address.
// ● Use object destructuring with the rest operator to assign name and email to individual variables, and the remaining properties to a variable rest.
// ● Log the variables to the console.

const personObj = {
    name: 'Sameer Saleem',
    age: 24,
    email: 'saleemsameer736@gmail.com',
    address: 'Karachi, Pakistan'
}

// let {name: myfullName, email: myEmail, ...rest} = personObj;

// console.log('My Name:' , myfullName);
// console.log('My Email:' , myEmail);
// console.log('Remaining Items: ', rest);


// Nested Destructuring:
// ● Create an object student with properties id, name, grades, and info (where info is another object with properties age and major).
// ● Use nested destructuring with the rest operator to extract id, name, and major to individual variables, and the remaining properties to a variable rest.
// ● Log the variables to the console.

const student = {
    id: 119,
    name: 'Mudassir',
    grades: 'A',
    info: {
        age: 27,
        major: 'ABC'
    }
};

// let {id: stdId, name: stdName, info: {major: stdMajor}, ...rest} = student;

// console.log(stdId);
// console.log(stdName);
// console.log(stdMajor);
// console.log(rest);


// Filter Even Numbers:
// ● Create a function filterEven that uses the rest operator to take any number of arguments.
// ● The function should return a new array containing only the even numbers.
// ● Call the function with different numbers of arguments and log the results.

filterEven = (...getNumbers) => {
    let result = getNumbers.filter(item => item % 2 == 0);
    // console.log(result);
}

filterEven(1, 2, 3, 4, 5, 6, 7, 8, 9, 0);


// Combine and Sort Arrays:
// ● Create a function combineAndSort that uses the rest operator to take any number of arrays.
// ● The function should combine all the arrays into one and return the sorted result.
// ● Call the function with different arrays and log the results.

combineAndSort = (...sortNumbersOfArr) => {

    let merged = [];
    sortNumbersOfArr.forEach(arr => {
        merged = [...merged, ...arr];
    });

    merged.sort((a, b) => a - b);


    console.log(merged);
}

// combineAndSort( [1, 3, 2], [5, 4, 6], [7, 8, 9]);