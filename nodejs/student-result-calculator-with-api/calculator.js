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

module.exports = { percentage, grade };