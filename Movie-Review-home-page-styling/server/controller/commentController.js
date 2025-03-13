const Comment = require('../models/Comment');
const User = require('../models/User');

// Add a comment
exports.addComment = async (req, res) => {
  try {
    const { movieTitle, text } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!movieTitle || !text) {
      return res.status(400).json({ message: 'Movie title and comment text are required' });
    }
    
    const newComment = new Comment({
      movieTitle,
      userId: req.user.id,
      userName: user.name,
      text
    });
    
    await newComment.save();
    
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get comments for a movie
exports.getMovieComments = async (req, res) => {
  try {
    const { movieTitle } = req.params;
    
    const comments = await Comment.find({ movieTitle })
      .sort({ createdAt: -1 });
    
    res.json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    // Check if user owns the comment
    if (comment.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    
    await comment.remove();
    
    res.json({ message: 'Comment removed' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};