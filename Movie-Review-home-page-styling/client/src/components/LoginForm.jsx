import { useState, useNavigate } from 'react';
import { addUser, Link } from 'react-router-dom';

const addUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length < 2) 
      return alert("Name must be at least 2 characters");

    addUserForm({ name, email }).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="container">
      <nav className="navLinks">
        <Link to="/" className="link">Home</Link> |
        <Link to="/add" className="link"> Add Account</Link>
      </nav>
      
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <input 
              type="text" 
              placeholder="Name" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              className="input"
            />
            {name.length > 0 && name.length < 2 && (
              <p className="errorText">Name must be at least 3 characters</p>
            )}
          </div>
          <div className="inputGroup">
            <input 
              type="text" 
              placeholder="Email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="input"
            />
          </div>
          <button 
            type="submit" 
            disabled={name.length < 2}
            className={`button ${name.length < 2 ? 'disabled' : 'active'}`}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default addUser;
