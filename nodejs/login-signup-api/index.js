const express = require('express');
const app = express();

const userRouter = require('./router/userRouter');

app.use(express.json());

app.use('/', userRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});