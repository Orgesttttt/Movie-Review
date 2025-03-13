import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import Nav from '../components/Nav';
import ReeltalkFooter from '../components/ReeltalkFooter';
import '../components/style/UserProfile.css';

const UserProfile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  
  // Mock favorite movies (in a real app, this would come from the backend)
  const favoriteMovies = [
    { id: 1, title: "Dune: Part Two", imageUrl: "https://www.filma24.bike/wp-content/uploads/dune-pjesa-2-me-titra-shqip.jpg" },
    { id: 2, title: "Poor Things", imageUrl: "https://www.filma24.bike/wp-content/uploads/rsz_6jbvaane1nijlbgy9goc5kphaoj.png" }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSaveChanges = () => {
    // In a real app, this would update the user profile in the backend
    // For now, we'll just toggle off editing mode
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <Nav />
      
      <div className="profile-container">
        <div className="profile-header">
          <h1>User Profile</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
        
        <div className="profile-card">
          <div className="profile-section">
            <h2>Personal Information</h2>
            
            {isEditing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="button-group">
                  <button onClick={handleSaveChanges} className="save-button">
                    Save Changes
                  </button>
                  <button onClick={() => setIsEditing(false)} className="cancel-button">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-info">
                <p><strong>Name:</strong> {currentUser?.name}</p>
                <p><strong>Email:</strong> {currentUser?.email}</p>
                <button onClick={() => setIsEditing(true)} className="edit-button">
                  Edit Profile
                </button>
              </div>
            )}
          </div>
          
          <div className="profile-section">
            <h2>Favorite Movies</h2>
            
            {favoriteMovies.length > 0 ? (
              <div className="favorites-grid">
                {favoriteMovies.map((movie) => (
                  <div key={movie.id} className="favorite-movie">
                    <img src={movie.imageUrl} alt={movie.title} />
                    <p>{movie.title}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>You haven't added any favorite movies yet.</p>
            )}
          </div>
        </div>
      </div>
      
      <ReeltalkFooter />
    </div>
  );
};

export default UserProfile;