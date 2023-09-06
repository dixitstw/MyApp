import React, { useState } from 'react';
import axios, { API_BASE_URL } from '../api'; // Import your Axios instance
import Navbar from '../Component/Navbar'; // Import the Navbar component

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password },  {
        headers: {
          'Content-type': 'application/json'
        }}); 
      console.log('User logged in successfully:', response.data);
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
      <Navbar /> {/* Include the Navbar component */}
      <div className="login-form-container">
        <h2>Log In</h2>
        {loginError && <p className="error-message">{loginError}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

// CSS Styles
const loginStyles = `
.login-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-form-container {
  width: 80%;
  max-width: 400px;
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
}

.error-message {
  color: red;
  margin: 10px 0;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input[type='email'],
input[type='password'] {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s, color 0.2s;
}

button:hover {
  background-color: #555;
}
`;

// Create a style element and append the CSS to the head
const styleElement = document.createElement('style');
styleElement.innerHTML = loginStyles;
document.head.appendChild(styleElement);

export default Login;
