import React, { useState, useEffect } from 'react';
import axios from '../api'; // Import your Axios instance
import Navbar from './Navbar'; // Import the Navbar component

function UserProfile({ userId }) {
  const [user, setUser] = useState(null); // State to hold the user data
  const [isFollowing, setIsFollowing] = useState(false); // State to track whether the logged-in user is following this user

  useEffect(() => {
    fetchUserProfile(); // Fetch user profile data when the component mounts
    checkFollowingStatus(); // Check if the logged-in user is following this user
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`/auth/${userId}`); // Replace with your API endpoint for fetching user profiles
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const checkFollowingStatus = async () => {
    try {
      const response = await axios.get(`/api/auth/${userId}/follow-status`); // Replace with your API endpoint for checking follow status
      setIsFollowing(response.data.isFollowing);
    } catch (error) {
      console.error('Error checking follow status:', error);
    }
  };

  const handleFollow = async () => {
    try {
      await axios.post(`/api/auth/${userId}/follow`); // Replace with your API endpoint for following a user
      setIsFollowing(true);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.post(`/api/auth/${userId}/unfollow`); // Replace with your API endpoint for unfollowing a user
      setIsFollowing(false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <div className="user-profile-container">
      <Navbar /> {/* Include the Navbar component */}
      {user ? (
        <div className="user-profile">
          <img className="profile-image" src={user.profileImage} alt={user.username} />
          <div className="username">{user.username}</div>
          <div className="bio">{user.bio}</div>
          {isFollowing ? (
            <button className="unfollow-button" onClick={handleUnfollow}>Unfollow</button>
          ) : (
            <button className="follow-button" onClick={handleFollow}>Follow</button>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

// CSS Styles
const userProfileStyles = `
.user-profile-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-profile {
  width: 80%;
  max-width: 600px;
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
  display: block;
}

.username {
  font-size: 1.5rem;
  color: #333;
  text-align: center;
  margin-top: 10px;
}

.bio {
  font-size: 1rem;
  color: #555;
  text-align: center;
  margin-top: 10px;
}

.follow-button, .unfollow-button {
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.2s, color 0.2s;
}

.follow-button:hover, .unfollow-button:hover {
  background-color: #555;
}
`;

// Create a style element and append the CSS to the head
const styleElement = document.createElement('style');
styleElement.innerHTML = userProfileStyles;
document.head.appendChild(styleElement);

export default UserProfile;
