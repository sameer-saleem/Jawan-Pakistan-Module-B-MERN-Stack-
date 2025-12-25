const express = require('express');
const app = express();
const stdRouter = require('./stdRouter');

app.use(express.json());

app.use('/student', stdRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});