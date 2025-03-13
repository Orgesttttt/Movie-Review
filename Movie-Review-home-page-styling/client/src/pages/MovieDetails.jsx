import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import Nav from '../components/Nav';
import ReeltalkFooter from '../components/ReeltalkFooter';
import { movies } from '../components/dataMovie';
import axios from 'axios';
import '../components/style/MovieDetails.css';

const API_URL = 'http://localhost:8000/api';

function MovieDetails() {
  const { movieTitle } = useParams();
  const navigate = useNavigate();
  const { currentUser, addToFavorites, removeFromFavorites } = useAuth();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Load movie details
  useEffect(() => {
    // Find the movie by title from our data
    const foundMovie = movies.find(m => 
      m.title === movieTitle || m.title === decodeURIComponent(movieTitle)
    );
    
    if (foundMovie) {
      setMovie(foundMovie);
      
      // Check if movie is in user's favorites
      const checkFavoriteStatus = async () => {
        if (currentUser) {
          try {
            const favorites = await axios.get(`${API_URL}/users/favorites`, {
              headers: {
                'x-auth-token': localStorage.getItem('token')
              }
            });
            setIsFavorite(favorites.data.includes(foundMovie.title));
          } catch (error) {
            console.error('Error checking favorite status:', error);
          }
        }
      };
      
      checkFavoriteStatus();
    }
    
    setLoading(false);
  }, [movieTitle, currentUser]);

  // Load comments
  useEffect(() => {
    const loadComments = async () => {
      try {
        const res = await axios.get(`${API_URL}/comments/movie/${encodeURIComponent(movieTitle)}`);
        setComments(res.data);
      } catch (error) {
        console.error('Error loading comments:', error);
      }
    };
    
    if (movie) {
      loadComments();
    }
  }, [movie, movieTitle]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      setShowLoginPrompt(true);
      return;
    }
    
    if (newComment.trim() === '') return;
    
    try {
      const res = await axios.post(`${API_URL}/comments`, {
        movieTitle: movie.title,
        text: newComment
      }, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      // Show error message to user
    }
  };

  const handleToggleFavorite = async () => {
    if (!currentUser) {
      setShowLoginPrompt(true);
      return;
    }
    
    try {
      if (isFavorite) {
        await removeFromFavorites(movie.title);
      } else {
        await addToFavorites(movie.title);
      }
      
      // Toggle favorite status
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorites:', error);
      // Show error message to user
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div>
        <Nav />
        <div className="not-found">
          <h2>Movie Not Found</h2>
          <p>Sorry, we couldn't find the movie you're looking for.</p>
          <button onClick={() => navigate('/movies')}>Back to Movies</button>
        </div>
        <ReeltalkFooter />
      </div>
    );
  }

  return (
    <div className="movie-details-page">
      <Nav />
      
      <div className="movie-details-container">
        <div className="movie-details-header">
          <div className="movie-poster">
            <img src={movie.imageUrl} alt={movie.title} />
          </div>
          
          <div className="movie-info">
            <h1>{movie.title}</h1>
            <div className="movie-genres">
              {movie.genre.split(', ').map((genre, index) => (
                <span key={index} className="genre-tag">{genre}</span>
              ))}
            </div>
            
            <div className="movie-actions">
              <button 
                className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
                onClick={handleToggleFavorite}
              >
                {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
              </button>
              
              <a 
                href={movie.movielink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="watch-button"
              >
                Watch Movie
              </a>
            </div>
            
            <div className="movie-description">
              <h3>Description</h3>
              <p>{movie.description}</p>
            </div>
          </div>
        </div>
        
        <div className="movie-comments-section">
          <h2>Comments</h2>
          
          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment._id} className="comment">
                  <div className="comment-header">
                    <span className="comment-author">{comment.userName}</span>
                    <span className="comment-date">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="no-comments">No comments yet. Be the first to comment!</p>
            )}
          </div>
          
          <div className="comment-form-container">
            <h3>Add a Comment</h3>
            <form onSubmit={handleAddComment} className="comment-form">
              <textarea
                placeholder={currentUser ? "Write your comment here..." : "Please login to comment"}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={!currentUser}
              />
              <button 
                type="submit" 
                disabled={!currentUser || newComment.trim() === ''}
              >
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {showLoginPrompt && (
        <div className="login-prompt-overlay">
          <div className="login-prompt">
            <h3>Login Required</h3>
            <p>You need to be logged in to {isFavorite !== null ? 'add favorites' : 'comment on movies'}.</p>
            <div className="login-prompt-buttons">
              <button onClick={handleLoginRedirect} className="login-button">
                Go to Login
              </button>
              <button onClick={() => setShowLoginPrompt(false)} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <ReeltalkFooter />
    </div>
  );
}

export default MovieDetails;