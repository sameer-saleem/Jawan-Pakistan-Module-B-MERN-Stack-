const express = require('express');
const app = express();

const userRouter = require('./router/userRouter');
const productRouter = require('./router/productRouter');

app.use(express.json());

app.use('/user', userRouter);

app.use('/products', productRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});