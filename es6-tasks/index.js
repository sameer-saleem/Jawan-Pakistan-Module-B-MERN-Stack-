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
// var city = 'Karachi';

// What value do you get?
// undefined 


// Hoisting with let and const:

// console.log(country);
// let country = 'Pakistan';

// Write code where you log a let variable before it is declared.
// Cannot access 'country' before initialization


// console.log(bike);
// const bike = '125';

// Cannot access 'bike' before initialization


// Re-declaration:

// Try to declare the same variable name twice using var.

// What happens in each case?

// var abc = 'abc';
// var abc = 'xyx';
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

// var value = 'empty string';
// value = 'value';

// console.log(value);

// value has been updated

// Declare a variable using let and assign it a value. Then reassign it a new value.

// let newValue = 123;
// newValue = 789;

// console.log(newValue);

// value has been updated


// Declare a variable using const and assign it a value. Then reassign it a new value.

// const data = 090;
// data = 369;
// console.log(data);

// cannot assign a value to constant variable

