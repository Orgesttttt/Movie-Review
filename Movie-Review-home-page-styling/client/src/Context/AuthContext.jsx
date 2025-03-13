import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// API URL
const API_URL = 'http://localhost:8000/api';

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  // Configure axios defaults
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  }

  // Check if user is already logged in
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await axios.get(`${API_URL}/auth/me`);
        setCurrentUser(res.data);
      } catch (err) {
        // Token is invalid or expired
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
      }
      
      setLoading(false);
    };
    
    loadUser();
  }, [token]);

  // Register a new user
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password
      });
      
      // Set token to localStorage
      localStorage.setItem('token', res.data.token);
      
      // Set auth token header
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      
      // Set token and user state
      setToken(res.data.token);
      setCurrentUser(res.data.user);
      
      return res.data.user;
    } catch (err) {
      throw err.response.data;
    }
  };

  // Login existing user
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      // Set token to localStorage
      localStorage.setItem('token', res.data.token);
      
      // Set auth token header
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      
      // Set token and user state
      setToken(res.data.token);
      setCurrentUser(res.data.user);
      
      return res.data.user;
    } catch (err) {
      throw err.response.data;
    }
  };

  // Logout user
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Remove auth header
    delete axios.defaults.headers.common['x-auth-token'];
    
    // Clear state
    setToken(null);
    setCurrentUser(null);
  };

  // Add a movie to favorites
  const addToFavorites = async (movieTitle) => {
    try {
      const res = await axios.post(`${API_URL}/users/favorites`, { movieTitle });
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  };

  // Remove a movie from favorites
  const removeFromFavorites = async (movieTitle) => {
    try {
      const res = await axios.delete(`${API_URL}/users/favorites/${encodeURIComponent(movieTitle)}`);
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  };

  // Get user's favorites
  const getFavorites = async () => {
    try {
      const res = await axios.get(`${API_URL}/users/favorites`);
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  };

  const value = {
    currentUser,
    token,
    loading,
    register,
    login,
    logout,
    addToFavorites,
    removeFromFavorites,
    getFavorites
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};