const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const tryCatch = require('../utils/tryCatch');

router.put('/updateMyPassword', tryCatch(userController.updatePassword));

module.exports = router;