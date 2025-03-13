import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Nav from "../components/Nav";
import ReeltalkFooter from "../components/ReeltalkFooter";
import "../components/style/Favourites.css";

function Favourites() {
    const { currentUser } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

   // Replace the useEffect with a real API call
useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const favoritesList = await getFavorites();
        
        // Fetch full movie details for each favorite
        // In a real app, you would have a backend endpoint to get all movie details at once
        const moviesWithDetails = favoritesList.map(title => {
          return movies.find(m => m.title === title) || { 
            id: Date.now(), 
            title, 
            genre: "Unknown", 
            imageUrl: "placeholder.jpg" 
          };
        });
        
        setFavorites(moviesWithDetails);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (currentUser) {
      loadFavorites();
    }
  }, [currentUser]);
  
  // Update remove function
  const handleRemoveFavorite = async (movieTitle) => {
    try {
      await removeFromFavorites(movieTitle);
      setFavorites(favorites.filter(movie => movie.title !== movieTitle));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

    return (
        <div className="favorites-page">
            <Nav />
            
            <div className="favorites-container">
                <div className="favorites-header">
                    <h1>My Favorite Movies</h1>
                    <p className="favorites-subheader">
                        {currentUser ? 
                            `Welcome ${currentUser.name}, here are your favorite movies.` : 
                            "Your favorite movies collection"
                        }
                    </p>
                </div>
                
                {loading ? (
                    <div className="favorites-loading">
                        <div className="loading-spinner"></div>
                        <p>Loading your favorites...</p>
                    </div>
                ) : favorites.length > 0 ? (
                    <div className="favorites-grid">
                        {favorites.map(movie => (
                            <div key={movie.id} className="favorite-movie-card">
                                <div className="favorite-movie-image">
                                    <Link to={`/movie/${encodeURIComponent(movie.title)}`}>
                                        <img src={movie.imageUrl} alt={movie.title} />
                                    </Link>
                                    <button 
                                        className="remove-favorite-button"
                                        onClick={() => handleRemoveFavorite(movie.id)}
                                    >
                                        ❌
                                    </button>
                                </div>
                                <div className="favorite-movie-info">
                                    <Link to={`/movie/${encodeURIComponent(movie.title)}`} className="favorite-movie-title">
                                        {movie.title}
                                    </Link>
                                    <p className="favorite-movie-genre">{movie.genre}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-favorites">
                        <h3>No favorites yet</h3>
                        <p>You haven't added any movies to your favorites yet.</p>
                        <Link to="/movies" className="browse-movies-button">Browse Movies</Link>
                    </div>
                )}
            </div>
            
            <ReeltalkFooter />
        </div>
    );
}

export default Favourites;