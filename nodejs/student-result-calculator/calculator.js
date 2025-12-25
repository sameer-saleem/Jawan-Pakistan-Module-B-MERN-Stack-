const obtainedMarksFunc = (sub1 = 0, sub2 = 0, sub3 = 0, sub4 = 0, sub5 = 0) => {
    return sub1 + sub2 + sub3 + sub4 + sub5;
}

// console.log(obtainedMarks(5,10,12,10));

const percentage = (obtainedMarks, totalMarks) => {

    const result = obtainedMarks / totalMarks * 100;
    return Math.round(result);

}

const grade = (percent) => {

    if (percent < 50) {
        return 'E';
    }

    else if (percent < 60) {
        return 'D';
    }

    else if (percent < 70) {
        return 'C';
    }

    else if (percent < 80) {
        return 'B';
    }

    else if (percent < 90) {
        return 'A';
    }

    else if (percent <= 100) {
        return 'A+';
    }
}

// console.log(percentage());

module.exports = { obtainedMarksFunc, percentage, grade };