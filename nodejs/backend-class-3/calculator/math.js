const add = (a, b) => {
    return (a + b);
}

const sub = (a, b) => {
    return (a - b);
}

const mul = (a, b) => {
    return (a * b);
}

const divi = (a, b) => {
    return b !== 0 ? a / b : 'Cannot divide by 0';
}

module.exports = { add, sub, mul, divi };