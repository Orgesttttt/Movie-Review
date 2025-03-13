import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useSearch } from '../Context/SearchContext';
import Logo from '../images/Logo.png';
import "./style/Nav.css";

function Nav() {
  const { currentUser } = useAuth();
  const { setSearchTerm } = useSearch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue);
    // Navigate to movies page with search results
    navigate('/movies');
  };

  return (
    <div>
      <nav className="navLinks">
        <img src={Logo} alt="Logo" onClick={() => window.location.href = "/"} />
        <ul>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/favourites">Favourites</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          
          {currentUser ? (
            <li className="user-nav-item">
              <Link to="/profile" className="user-link">
                <span className="user-icon">👤</span>
                {currentUser.name}
              </Link>
            </li>
          ) : (
            <li className="auth-nav-group">
              <Link to="/login" className="auth-link login-link">Login</Link>
              <Link to="/register" className="auth-link register-link">Register</Link>
            </li>
          )}
        </ul>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input 
            type="search" 
            placeholder="Search movies..." 
            value={inputValue}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-button">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>
      </nav>
    </div>
  );
}

export default Nav;