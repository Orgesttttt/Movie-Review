const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser } = require('../controller/AuthController');
const auth = require('../middleware/auth');

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Get current user route
router.get('/me', auth, getCurrentUser);

module.exports = router;