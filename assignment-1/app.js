// Q1. Write a program in which you have to create your own biodata details are: your name, email, city,
// education, occupation, phone number, institute name etc. Using template literals and variable using let
// and const and final output is shown in document.write() same as in below:

let fullname = "Sameer Saleem";
let email = 'saleemsameer736@gmail.com';
let city = 'KHI';
let education = 'BSCS';
let occupation = "Software Developer";
let phone = "03448285449";
let age = 23;
let institute = "Jawan Pakistan";

const output =
    `Name: ${fullname} <br/>
Email: ${email} <br/>
City: ${city} <br/>
Education: ${education} <br/>
Occupation: ${occupation} <br/>
Phone Number: ${phone} <br/>
Age: ${age} <br/>
Institute: ${institute}
`;


document.write(output);

// Q2: Students using this below image you have to create each variable keyword apply at least one
// example for tasks executing. I share the output everyone must same as in the image.

// Global Scope 
var myname = "Sameer";

// Function Scope 
function ss() {
    var fullname1 = "Sameer Saleem";
    // console.log(fullname1);
}
ss();
// console.log(fullname1);

// Block scope 
if (true) {
    var ksm = 'Block';
}

console.log(ksm);

// Reassign
myname = "Sameer 01";

// Redeclare 
var myname = "Sameer 02";


// Hoisting (YES)
console.log(fname);

var fname = "John";





