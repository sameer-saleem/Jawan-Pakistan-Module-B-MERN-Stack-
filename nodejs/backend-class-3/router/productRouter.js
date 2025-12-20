const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('All products');
});

router.post('/add', (req, res) => {
    console.log(req.body,'pd')
    const product = req.body;
    res.send(`Product body: ${JSON.stringify(product)}`);

});

module.exports = router;

// productRouter.js
// get all products
// post on new products 