const express = require('express');
const router = express.Router();
const { addToFavorites, removeFromFavorites, getFavorites } = require('../controller/UserController');
const auth = require('../middleware/auth');

// Add to favorites
router.post('/favorites', auth, addToFavorites);

// Remove from favorites
router.delete('/favorites/:movieTitle', auth, removeFromFavorites);

// Get favorites
router.get('/favorites', auth, getFavorites);

module.exports = router;