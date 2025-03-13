const express = require('express');
const router = express.Router();
const { addComment, getMovieComments, deleteComment } = require('../controller/commentController');
const auth = require('../middleware/auth');

// Add a comment
router.post('/', auth, addComment);

// Get comments for a movie
router.get('/movie/:movieTitle', getMovieComments);

// Delete a comment
router.delete('/:id', auth, deleteComment);

module.exports = router;