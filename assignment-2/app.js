
let math = 60;
let pak = 30;
let phy = 95;
let cs = 89;

const totalsubjects = 4;
const markspersubject = 100;

const totlaMarksOfStudent = math + pak + phy + cs;
console.log(totlaMarksOfStudent);

const totalMarksOfSubjects = totalsubjects * markspersubject;
console.log(totalMarksOfSubjects);

const percentage = totlaMarksOfStudent / totalMarksOfSubjects * 100;

console.log(percentage + "%");


let studentgrade = '';

if (percentage >= 90) {
    studentgrade = 'A+'
} else if (percentage > 70 || percentage > 80) {
    studentgrade = 'A'
}
else if (percentage > 60) {
    studentgrade = 'B'
}
else if (percentage > 50) {
    studentgrade = 'C'
}
else if (percentage > 45) {
    studentgrade = 'D'
} else {
    studentgrade = 'F';
}

console.log(studentgrade);


document.write(
    `<h1>Mark Sheet</h1>
    Total Subjects: <strong>${totalsubjects}</strong> <br/><br/>
    Math: <strong>${math}/100</strong> <br/>
    Pak Studies: <strong>${pak}/100 </strong> <br/>
    Physics: <strong>${phy}/100</strong> <br/>
    Computer Science: <strong>${cs}/100</strong> <br/><br/>
    Total Marks of Student : <strong>${totlaMarksOfStudent}</strong><br><br/>
    Student's Percentage: <strong>${percentage}%</strong><br><br/>
    Student's Grade: <strong>${studentgrade}</strong>
    `
)