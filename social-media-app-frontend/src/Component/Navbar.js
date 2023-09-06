import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api';

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/auth/:id'); // Assuming this endpoint returns user data
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const navbarStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'darkgreen',
    color: '#fff',
    padding: '0.5rem'
  };

  const logoStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const logoTextStyles = {
    marginLeft: '0.5rem',
    fontFamily: 'Impact',
    fontSize: '2rem',
    fontWeight: 'bold',
    letterSpacing: '10px', 
    color: '#FF8C00', 
  };

  const linkStyles = {
    color: 'Yellow',
    textDecoration: 'none'
  };

  const userInfoStyles = {
    fontSize: '1rem',
    fontWeight: 'bold'
  };

  return (
    <nav style={navbarStyles}>
      <div style={{ ...logoStyles, flex: 1 }}>
        <Link to="/" style={linkStyles}>
          <span role="img" aria-label="Logo">
            🚀
          </span>
          <span style={logoTextStyles}>DopaGram</span>
        </Link>
      </div>
      <ul style={{ ...linkStyles, listStyle: 'none', display: 'flex', gap: '1rem' }}>
        <li><Link to="/" style={linkStyles}>Home</Link></li>
        <li><Link to="/userprofile" style={linkStyles}>Profile</Link></li>
        <li><Link to="/login" style={linkStyles}>Login</Link></li>
        <li><Link to="/register" style={linkStyles}>Register</Link></li>
      </ul>
      {user && (
        <div style={userInfoStyles}>
          Welcome, {user.username}!
        </div>
      )}
    </nav>
  );
}

export default Navbar;
