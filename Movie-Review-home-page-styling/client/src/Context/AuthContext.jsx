import { createContext, useState, useEffect, useContext } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Register a new user
  const register = (name, email, password) => {
    // In a real app, this would make an API call
    const newUser = { id: Date.now().toString(), name, email };
    
    // Store user in localStorage (this simulates a backend)
    localStorage.setItem('user', JSON.stringify(newUser));
    setCurrentUser(newUser);
    return Promise.resolve(newUser);
  };

  // Login existing user
  const login = (email, password) => {
    // In a real app, this would validate credentials against a backend
    // For now, we'll create a mock user to simulate successful login
    const user = { id: Date.now().toString(), name: email.split('@')[0], email };
    
    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
    return Promise.resolve(user);
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};