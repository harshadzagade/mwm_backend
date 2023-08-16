const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Route to like a song
router.post('/like/:songId', userController.likeSong);

// Route to dislike a song
router.post('/dislike/:songId', userController.dislikeSong);

module.exports = router;
