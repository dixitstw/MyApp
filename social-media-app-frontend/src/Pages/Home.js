import React, { useState, useEffect } from 'react';
import axios from '../api'; // Import your Axios instance
import Navbar from '../Component/Navbar';
import Feed from '../Component/Feed';

function Home() {
  const [posts, setPosts] = useState([]); // State to hold the posts data

  useEffect(() => {
    fetchPosts(); // Fetch posts data when the component mounts
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('posts/getallposts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="home-container">
      <Navbar/> {/* Include the Navbar component */}
      <div className="feed">
        {posts.map((post) => (
          <div key={post._id} className="post">
            <div className="post-header">
              <img className="profile-image" src={post.author.profileImage} alt={post.author.username} />
              <div className="post-author">{post.author.username}</div>
            </div>
            <div className="post-content">{post.content}</div>
            <div className="post-interactions">
              <button className="like-button">Like</button>
              <button className="comment-button">Comment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// CSS Styles
const homeStyles = `
.home-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feed {
  width: 80%;
  max-width: 600px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.post {
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  align-items: center;
}

.profile-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.post-author {
  font-size: 1rem;
  color: #333;
}

.post-content {
  font-size: 1.2rem;
  color: #555;
  margin-top: 10px;
}

.post-interactions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.like-button, .comment-button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.like-button:hover, .comment-button:hover {
  background-color: #555;
}
`;

// Create a style element and append the CSS to the head
const styleElement = document.createElement('style');
styleElement.innerHTML = homeStyles;
document.head.appendChild(styleElement);

export default Home;
