const User = require('../models/User');

// Add movie to favorites
exports.addToFavorites = async (req, res) => {
  try {
    const { movieTitle } = req.body;
    
    if (!movieTitle) {
      return res.status(400).json({ message: 'Movie title is required' });
    }
    
    const user = await User.findById(req.user.id);
    
    // Check if movie is already in favorites
    if (user.favorites.includes(movieTitle)) {
      return res.status(400).json({ message: 'Movie already in favorites' });
    }
    
    user.favorites.push(movieTitle);
    await user.save();
    
    res.json(user.favorites);
  } catch (error) {
    console.error('Add to favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove movie from favorites
exports.removeFromFavorites = async (req, res) => {
  try {
    const { movieTitle } = req.params;
    
    const user = await User.findById(req.user.id);
    
    // Remove movie from favorites
    user.favorites = user.favorites.filter(title => title !== movieTitle);
    await user.save();
    
    res.json(user.favorites);
  } catch (error) {
    console.error('Remove from favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's favorites
exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.favorites);
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};