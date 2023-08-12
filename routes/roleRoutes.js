const express = require('express');
const roleController = require('../controllers/roleController');
const router = express.Router();

router.post('/create', roleController.createRole);
router.get('/get', roleController.getRoles);

module.exports = router;