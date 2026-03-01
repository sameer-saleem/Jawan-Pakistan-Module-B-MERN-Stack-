const userData = [
    {
        user: 'Sameer Saleem',
        rollNumber: 211,
        Class: "BSCS",
        subjects: {
            english: 89,
            urdu: 98,
            islamiat: 88,
        }
    },
    {
        user: 'Ghulam Nabi',
        rollNumber: 212,
        Class: "BSSE",
        subjects: {
            english: 65,
            urdu: 27,
            islamiat: 68,
        }
    },
    {
        user: 'Kashan',
        rollNumber: 213,
        Class: "BBA",
        subjects: {
            english: 99,
            urdu: 79,
            islamiat: 44,
        }
    },
    {
        user: 'Ikram',
        rollNumber: 214,
        Class: "LLB",
        subjects: {
            english: 55,
            urdu: 66,
            islamiat: 88,
        }
    },
    {
        user: 'Faizan Raza',
        rollNumber: 215,
        Class: "BBA",
        subjects: {
            english: 45,
            urdu: 29,
            islamiat: 78,
        }
    },
    {
        user: 'Syed Waqas Hussain',
        rollNumber: 216,
        Class: "BCom",
        subjects: {
            english: 57,
            urdu: 49,
            islamiat: 38,
        }
    }
];

const userNameEl = document.getElementById('username');
const rollnumberEl = document.getElementById('rollnumber');
const classNameEl = document.getElementById('class');
const userDetails = document.getElementById('userDetails');
const studentsList = document.getElementById('studentsList');
const studentDetails = document.getElementById('studentDetails');

// All students List 
userData.forEach((item, i) => {
    studentsList.innerHTML += `
        <li>
            <i class="count">${i + 1}.</i> 
            <div class="d-flex gap-4 align-items-center">
                <span title="${item.user}" class="std-name">${item.user}</span>
                <span class="std-roll-number">${item.rollNumber}</span>
                <span class="std-class">${item.Class}</span>
            </div>
        </li>
    `
});

let stdName;
let stdRollnumber;
let stdClass;
let finalStdResult = [];

getFieldsData = () => {

    stdName = userNameEl.value;
    stdRollnumber = rollnumberEl.value;
    stdClass = classNameEl.value;

    if (stdName != "" && stdName != null && stdRollnumber != "" && stdRollnumber != null && stdClass != "" && stdClass != null) {

        finalStdResult = userData.filter(item => {
            return item.user.toLowerCase() == stdName.toLowerCase() && item.rollNumber == stdRollnumber && item.Class.toLowerCase() == stdClass.toLowerCase()
        });
    } else {
        alert("Please fill all the fields");
    }

    if (finalStdResult.length > 0) {


        finalStdResult.forEach(item => {

            let stdSubjects = item.subjects;
            let stdSubjectInd = Object.keys(stdSubjects).map(item => `<td>${stdSubjects[item]}</td>`);
            let subjectsTotal = Object.keys(stdSubjects).map(item => stdSubjects[item]);

            let totalSubjects = subjectsTotal.length;
            let totalMarksOfStudent = 0;


            subjectsTotal.forEach((item => {
                totalMarksOfStudent += item;
            }))

            let totalSubjectsNumbers = totalSubjects * 100;

            let percentage = totalMarksOfStudent / totalSubjectsNumbers * 100;

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



            studentDetails.innerHTML = `
            <tr>
                <td>${item.user}</td>
                <td>${item.rollNumber}</td>
                <td>${item.Class}</td>
                ${stdSubjectInd}
                <td>${Math.round(percentage)} %</td>
                <td>${studentgrade}</td>
            </tr>`

            userNameEl.value = "";
            rollnumberEl.value = "";
            classNameEl.value = "";

        });
    } else {
        studentDetails.innerHTML = `
        <tr>
            <td colspan="8">
                <div class="alert alert-danger w-100 mt-2" role="alert">
                    No Results Found
                </div>
            </td>
        </tr>
        `
    }
}


