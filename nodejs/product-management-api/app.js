const express = require('express');
const app = express();
const productRouter = require('./product');

app.use(express.json());

app.use('/product', productRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});