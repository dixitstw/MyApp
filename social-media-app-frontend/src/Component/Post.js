import React, { useState, useEffect } from 'react';
import axios from '../api'; // Import your Axios instance
import Navbar from './Navbar'; // Import the Navbar component

function Post() {
  const [post, setPost] = useState(null); // State to hold the post data

  useEffect(() => {
    fetchPost(); // Fetch the post data when the component mounts
  }, []);

  const fetchPost = async () => {
    try {
      const response = await axios.post('/posts/post',
      {
        headers: {
        'Content-Type': 'application/json'
      }}); // Replace with your API endpoint
      setPost(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  return (
    <div className="post-container">
      <Navbar /> {/* Include the Navbar component */}
      {post ? (
        <div className="post">
          <div className="post-header">
            <img className="profile-image" src={post.author.profileImage} alt={post.author.username} />
            <div className="post-author">{post.author.username}</div>
          </div>
          <div className="post-content">{post.content}</div>
          {/* Add likes and comments */}
          <div className="post-actions">
            <button className="like-button">Like</button>
            <button className="comment-button">Comment</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

// CSS Styles
const postStyles = `
.post-container {
  background-color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post {
  width: 80%;
  max-width: 600px;
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  align-items: center;
}

.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.post-author {
  font-size: 1.2rem;
  color: #333;
}

.post-content {
  font-size: 1.2rem;
  margin-top: 10px;
  color: #555;
}

.post-actions {
  margin-top: 15px;
}

.like-button, .comment-button {
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.2s, color 0.2s;
}

.like-button:hover, .comment-button:hover {
  background-color: #555;
}
`;

// Create a style element and append the CSS to the head
const styleElement = document.createElement('style');
styleElement.innerHTML = postStyles;
document.head.appendChild(styleElement);

export default Post;
