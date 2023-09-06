const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
  try {
    const currentUser = req.user; // Assuming you have implemented user authentication middleware
    const { content } = req.body;
    const newPost = new Post({ author: currentUser._id, content });
    currentUser.posts.push(newPost._id);
    await newPost.save();
    await currentUser.save();
    return res.json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ error: 'Failed to create post.' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .populate('likes', 'username')
      .populate('comments.author', 'username')
      .sort({ createdAt: -1 });
    return res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ error: 'Failed to fetch posts.' });
  }
};

exports.likePost = async (req, res) => {
  try {
    const currentUser = req.user; // Assuming you have implemented user authentication middleware
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    if (post.likes.includes(currentUser._id)) {
      return res.status(400).json({ error: 'Post already liked by the user.' });
    }

    post.likes.push(currentUser._id);
    await post.save();
    return res.json(post);
  } catch (error) {
    console.error('Error liking post:', error);
    return res.status(500).json({ error: 'Failed to like post.' });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const currentUser = req.user; // Assuming you have implemented user authentication middleware
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    if (!post.likes.includes(currentUser._id)) {
      return res.status(400).json({ error: 'Post has not been liked by the user.' });
    }

    post.likes = post.likes.filter((likeId) => likeId.toString() !== currentUser._id.toString());
    await post.save();
    return res.json(post);
  } catch (error) {
    console.error('Error unliking post:', error);
    return res.status(500).json({ error: 'Failed to unlike post.' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const currentUser = req.user; // Assuming you have implemented user authentication middleware
    const postId = req.params.id;
    const { content } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    const newComment = {
      author: currentUser._id,
      content,
    };

    post.comments.push(newComment);
    await post.save();
    return res.json(post);
  } catch (error) {
    console.error('Error adding comment:', error);
    return res.status(500).json({ error: 'Failed to add comment.' });
  }
};

