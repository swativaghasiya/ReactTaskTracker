const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// router.post('/signup', signup);
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // the rest...
});
router.post('/login', login);

module.exports = router;
