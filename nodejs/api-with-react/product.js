const express = require('express');
const router = express.Router();

let products = [];

router.post('/', (req, res) => {

    if (!req.body) {
        return res.status(400).json({
            message: 'req.body is required'
        });
    }

    let pdList = req.body
    products = pdList;

    res.status(201).json({
        message: 'Products added successfully',
        pdList
    });
});

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Product list fetched successfully',
        products
    });
});

module.exports = router;