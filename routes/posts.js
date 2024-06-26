const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const tryCatch = require('../utils/tryCatch');

router.route('/')
    .post(tryCatch(postController.createPost))
    .get(tryCatch(postController.getPosts))

router.route('/:id')
    .get(tryCatch(postController.getPost))
    .delete(tryCatch(postController.deletePost))

module.exports = router