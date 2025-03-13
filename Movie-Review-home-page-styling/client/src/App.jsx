import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext.jsx';
import { SearchProvider } from './Context/SearchContext';
import ProtectedRoute from './components/ProtectedRoute';
import MovieList from './pages/MovieList.jsx';
import Favourites from './pages/Favourites.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import UserProfile from './pages/UserProfile.jsx';
import AboutUs from './pages/AboutUs.jsx';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/movies" element={<MovieList />} />
            
            {/* Protected routes */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/favourites" 
              element={
                <ProtectedRoute>
                  <Favourites />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;