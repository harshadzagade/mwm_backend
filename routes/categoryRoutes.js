const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

// Route to add a new media category
router.post('/add', categoryController.addCategory);

module.exports = router;
