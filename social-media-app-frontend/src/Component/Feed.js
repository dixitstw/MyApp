import React, { useState, useEffect } from 'react';
import axios from '../api';
import Navbar from './Navbar'; // Import the Navbar component

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts/getallposts'); 
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="feed">
      <Navbar /> {/* Include the Navbar component */}
      <div className="feed-container">
        <h2 className="feed-heading">Explore Feed</h2>
        {/* Map through posts and display them */}
        {posts.map((post) => (
          <div key={post._id} className="post">
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
        ))}
      </div>
    </div>
  );
}

export default Feed;

// Add CSS styles here
const styles = `
.feed {
  background-color: skyblue;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
}

.feed-container {
  width: 90%;
  max-width: 2000px;
  margin-top: 20px;
  padding: 30px;
  background-color: White;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  margin-left: 95px;
}

.feed-heading {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: Black;
  box-shadow: 10px;
  fontFamily: Verdana;
}

.post {
  border: 1px solid #ddd;
  margin: 20px 0;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
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
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
