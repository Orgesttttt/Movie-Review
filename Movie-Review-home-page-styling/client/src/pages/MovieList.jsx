import React, { useState } from "react";
import Nav from "../components/Nav";
import { movies } from "../components/dataMovie";
import { Link } from 'react-router-dom';
import '../components/style/MovieList.css';
import ReeltalkFooter  from "../components/ReeltalkFooter";

function MovieList() {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleCategory = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre.split(', ').includes(selectedGenre))
    : movies;

  const genres = [...new Set(movies.flatMap((movie) => movie.genre.split(', ')))];

  return (
    <div>
      <nav className="navLinks">
        <Nav />
      </nav>
      <div className="genre">
        <button onClick={() => handleCategory(null)}>All</button>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleCategory(genre)}>
            {genre}
          </button>
        ))}
      </div>
      <div className="movie-container"></div>
      <div className="movieList">
        {filteredMovies.map((movie) => (
          <Link to={`/movie/${movie.title}`} key={movie.title} className="movie-item">
            <img src={movie.imageUrl} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.genre}</p>
          </Link>
        ))}
      </div>
      <div>
        <ReeltalkFooter />  
      </div>
    </div>
    
  );
}

export default MovieList;