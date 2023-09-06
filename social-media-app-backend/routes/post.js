// routes/post.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/post', postController.createPost);
router.get('/getallposts', postController.getAllPosts);
router.post('/:id/like', postController.likePost);
router.post('/:id/unlike', postController.unlikePost);
router.post('/:id/comment', postController.addComment);

module.exports = router;
