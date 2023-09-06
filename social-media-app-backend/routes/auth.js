const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User registration
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// Get user profile by ID
router.get('/:id', userController.getUserById);

// Follow a user
router.post('/:id/follow', userController.followUser);

// Unfollow a user
router.post('/:id/unfollow', userController.unfollowUser);

module.exports = router;
