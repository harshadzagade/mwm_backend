const express = require('express');
const mediaController = require('../controllers/mediaController');
const router = express.Router();

// Route to add new media
router.post('/add', mediaController.addMedia);

module.exports = router;
