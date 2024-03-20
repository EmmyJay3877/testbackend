const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const tryCatch = require('../utils/tryCatch');

router.route('/')
    .post(tryCatch(postController.createPost))


module.exports = router