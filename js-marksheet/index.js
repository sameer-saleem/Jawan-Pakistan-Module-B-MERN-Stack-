const userData = [
    {
        user: 'Sameer Saleem',
        rollNumber: 211,
        Class: "Bachelors IP",
        subjects: {
            english: 57,
            maths: 25,
            PST: 39,
        }
    },
    {
        user: 'Sir Hamza',
        rollNumber: 212,
        Class: "Bachelors",
        subjects: {
            english: 59,
            maths: 68,
            PST: 36,
        }
    }
];

const userNameEl = document.getElementById('username');
const rollnumberEl = document.getElementById('rollnumber');
const classNameEl = document.getElementById('class');
const userDetails = document.getElementById('userDetails');

getFieldsData = () => {
    let name = userNameEl.value;
    let rollnumber = rollnumberEl.value;
    let userClass = classNameEl.value;
}


userData.forEach(item => {
    userDetails.innerHTML = `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${item.user}</h5>
            <p class="card-text">${item.rollNumber}</p>
            <p class="card-text">${item.Class}</p>
            ${item.subjects.forEach(sub => {
                `<p class="card-text">${sub.name}${sub.value}</p>`
            } )}
        </div>
    </div>`
})


