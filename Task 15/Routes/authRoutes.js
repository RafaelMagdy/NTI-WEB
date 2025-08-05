const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');
const protect = require('../middleware/protect');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/profile', protect, (req, res) => {
  res.status(200).json({ message: 'Welcome to your profile', user: req.user });
});

module.exports = router;
