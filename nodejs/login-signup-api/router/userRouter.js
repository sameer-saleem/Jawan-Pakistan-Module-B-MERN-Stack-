const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.send('Login Successful!');
});

router.post('/signup', (req, res) => {
    const user = req.body;
    res.send(user);
    console.log(req.body);
});

module.exports = router;