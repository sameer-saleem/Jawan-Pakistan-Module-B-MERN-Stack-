const userData = [
    {
        user: 'Sameer Saleem',
        rollNumber: 211,
        Class: "BSCS",
        subjects: {
            english: 57,
            urdu: 25,
            islamiat: 39,
        }
    },
    {
        user: 'Ghulam Nabi',
        rollNumber: 212,
        Class: "BSSE",
        subjects: {
            english: 59,
            urdu: 68,
            islamiat: 36,
        }
    },
    {
        user: 'Kashan',
        rollNumber: 213,
        Class: "BBA",
        subjects: {
            english: 59,
            urdu: 68,
            islamiat: 36,
        }
    },
    {
        user: 'Ikram',
        rollNumber: 214,
        Class: "LLB",
        subjects: {
            english: 59,
            urdu: 68,
            islamiat: 36,
        }
    },
    {
        user: 'Faizan Raza',
        rollNumber: 215,
        Class: "BBA",
        subjects: {
            english: 59,
            urdu: 68,
            islamiat: 36,
        }
    },
    {
        user: 'Syed Waqas Hussain',
        rollNumber: 216,
        Class: "BCom",
        subjects: {
            english: 59,
            urdu: 68,
            islamiat: 36,
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

    finalStdResult = userData.filter(item => {
        return item.user == stdName && item.rollNumber == stdRollnumber && item.Class == stdClass
    });

    finalStdResult.forEach(item => {

        let stdSubjects = item.subjects;
        let stdSubjectInd = Object.keys(stdSubjects).map(item => `<td>${stdSubjects[item]}</td>`);
        
        studentDetails.innerHTML += `
            <tr>
                <td>${item.user}</td>
                <td>${item.rollNumber}</td>
                <td>${item.Class}</td>
                ${stdSubjectInd}
            </tr>
        `
    })

}


