import React, { useState } from 'react';
import axios from '../api'; // Import your Axios instance
import Navbar from '../Component/Navbar';
import { useNavigate } from 'react-router-dom';

function Register() {
  let [username, setUsername] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [profileImage, setProfileImage] = useState(null);
  let [registrationError, setRegistrationError] = useState(null);
  let [success, setSuccess]= useState(false)

  let navigate = useNavigate()

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('profileImage', profileImage);

      let user = {username, email, password}

      let response = await fetch('http://localhost:5000/api/auth/register', 
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
        }) // Replace with your API endpoint for user registration
      // Handle successful registration (e.g., redirect to login page)
      let data = await response.json()
      if(data){
        setSuccess(true)
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setRegistrationError('An error occurred during registration.');
    }
  };

  const redirect = () => {
    if(success){
      navigate('/')
    }
  }

  return (
    <div className="register-container">
      {redirect()}
      <Navbar/> {/* Include the Navbar component */}
      <div className="register-form-container">
        <h2>Sign Up</h2>
        {registrationError && <p className="error-message">{registrationError}</p>}
        <form onSubmit={handleRegistration} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <input
            type="file"
            accept=".jpg,.png,.jpeg"
            onChange={(e) => setProfileImage(e.target.files[0])}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

// CSS Styles
const registerStyles = `
.register-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-form-container {
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

input[type='text'],
input[type='email'],
input[type='password'],
input[type='file'] {
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
styleElement.innerHTML = registerStyles;
document.head.appendChild(styleElement);

export default Register;
