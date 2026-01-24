const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// GET /api/protected
router.get('/', auth, (req, res) => {
  res.status(200).json({
    message: `Hello ${req.user.name}, you are authorized!`,
    user: req.user
  });
});

module.exports = router;
