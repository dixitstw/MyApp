const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password)

  try {
    // Check if the username or email is already registered
    const userExists = await User.exists({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).json({ error: 'Username or email already registered.' });
    }

    // Hash the password before saving it to the database
//    const hashedPassword = await bcrypt.hash(password,"encrypted");

    // Create a new user instance with hashed password
    const newUser = new User({ 
      username, 
      email, 
      password });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Send the saved user as a response
    return res.json(savedUser);
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Failed to register user.' });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by the username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    // If password is correct, send the user as the response
    return res.json(user);
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ error: 'Failed to fetch user.' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('posts', '-__v')
      .populate('following', 'username')
      .populate('followers', 'username');
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    return res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Failed to fetch user.' });
  }
};

exports.followUser = async (req, res) => {
  try {
    const currentUser = req.user; // Assuming you have implemented user authentication middleware
    const userToFollow = await User.findById(req.params.id);
    if (!userToFollow) {
      return res.status(404).json({ error: 'User not found.' });
    }
    if (currentUser.following.includes(userToFollow._id)) {
      return res.status(400).json({ error: 'Already following this user.' });
    }

    currentUser.following.push(userToFollow._id);
    userToFollow.followers.push(currentUser._id);

    await currentUser.save();
    await userToFollow.save();

    return res.json({ message: 'Successfully followed the user.' });
  } catch (error) {
    console.error('Error following user:', error);
    return res.status(500).json({ error: 'Failed to follow user.' });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const currentUser = req.user; // Assuming you have implemented user authentication middleware
    const userToUnfollow = await User.findById(req.params.id);
    if (!userToUnfollow) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const followingIndex = currentUser.following.indexOf(userToUnfollow._id);
    if (followingIndex === -1) {
      return res.status(400).json({ error: 'You are not following this user.' });
    }

    currentUser.following.splice(followingIndex, 1);
    await currentUser.save();

    const followerIndex = userToUnfollow.followers.indexOf(currentUser._id);
    if (followerIndex !== -1) {
      userToUnfollow.followers.splice(followerIndex, 1);
      await userToUnfollow.save();
    }

    return res.json({ message: 'Successfully unfollowed the user.' });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return res.status(500).json({ error: 'Failed to unfollow user.' });
  }
};

// Add other user-related controller functions as needed
