const express = require('express');
const router = express.Router();

const products = [];

router.post('/', (req, res) => {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
        return res.status(400).json({
            message: 'Name, price and image are required'
        });
    }

    const product = {
        id: products.length + 1,
        name,
        price,
        image
    };

    products.push(product);

    res.status(201).json({
        message: 'Product added successfully',
        product
    });
});

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Product list fetched successfully',
        products
    });
});

module.exports = router;