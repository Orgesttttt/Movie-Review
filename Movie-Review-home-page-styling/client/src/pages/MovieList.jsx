import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { movies } from "../components/dataMovie";
import { Link } from 'react-router-dom';
import { useSearch } from "../Context/SearchContext";
import '../components/style/MovieList.css';
import ReeltalkFooter from "../components/ReeltalkFooter";

function MovieList() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { searchTerm, searchResults, performSearch } = useSearch();
  const [displayedMovies, setDisplayedMovies] = useState(movies);
  
  // Effect to filter movies when searchTerm or selectedGenre changes
  useEffect(() => {
    if (searchTerm) {
      // If there's a search term, perform search
      performSearch(movies, searchTerm);
    } else {
      // Reset search results when search term is cleared
      setDisplayedMovies(selectedGenre
        ? movies.filter((movie) => movie.genre.split(', ').includes(selectedGenre))
        : movies);
    }
  }, [searchTerm, selectedGenre, performSearch]);
  
  // Update displayed movies when search results change
  useEffect(() => {
    if (searchTerm && searchResults.length > 0) {
      // If we have search results, filter them by genre if necessary
      setDisplayedMovies(selectedGenre
        ? searchResults.filter((movie) => movie.genre.split(', ').includes(selectedGenre))
        : searchResults);
    } else if (searchTerm) {
      // If we have a search term but no results
      setDisplayedMovies([]);
    }
  }, [searchResults, selectedGenre, searchTerm]);

  const handleCategory = (genre) => {
    setSelectedGenre(genre);
    
    // If search term exists, filter search results by genre
    if (searchTerm && searchResults.length > 0) {
      setDisplayedMovies(genre
        ? searchResults.filter((movie) => movie.genre.split(', ').includes(genre))
        : searchResults);
    } else {
      // Otherwise filter all movies by genre
      setDisplayedMovies(genre
        ? movies.filter((movie) => movie.genre.split(', ').includes(genre))
        : movies);
    }
  };

  const genres = [...new Set(movies.flatMap((movie) => movie.genre.split(', ')))];

  return (
    <div>
      <nav className="navLinks">
        <Nav />
      </nav>
      
      <div className="movie-list-header">
        {searchTerm && (
          <div className="search-status">
            <h2>Search results for: "{searchTerm}"</h2>
            <button 
              onClick={() => window.location.reload()} 
              className="clear-search"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
      
      <div className="genre">
        <button onClick={() => handleCategory(null)}>All</button>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleCategory(genre)}>
            {genre}
          </button>
        ))}
      </div>
      
      <div className="movie-container"></div>
      
      {displayedMovies.length > 0 ? (
        <div className="movieList">
          {displayedMovies.map((movie) => (
            <Link to={`/movie/${movie.title}`} key={movie.title} className="movie-item">
              <img src={movie.imageUrl} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.genre}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h3>No movies found</h3>
          <p>Try adjusting your search term or filter criteria</p>
        </div>
      )}
      
      <div>
        <ReeltalkFooter />  
      </div>
    </div>
  );
}

export default MovieList;