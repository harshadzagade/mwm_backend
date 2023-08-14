const express = require('express');
const artistController = require('../controllers/artistController');
const router = express.Router();

// Route to add a new artist
router.post('/add', artistController.addArtist);

module.exports = router;