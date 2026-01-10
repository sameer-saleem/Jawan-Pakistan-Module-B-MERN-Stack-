const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('Signup Router works');
});

module.exports = router;