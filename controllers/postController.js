const Post = require('../model/Post');
const User = require('../model/User');

const createPost = async (req, res) => {
    const { text } = req.body;
    if (!text) throw Error('Post is empty', 400);

    // create a new post
    const newPost = await Post.create({
        "text": text,
    });

    if (newPost) {
        res.status(201).json({ "success": `a new post was created` })
    };

}

const getPosts = async (req, res) => {
    const posts = await Post.find();
    if (!posts) throw Error('No posts found.', 204);

    console.log(posts);

    res.json(posts);
}

const getPost = async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id }).exec();
    if (!post) throw Error(`No post matches ID ${req.params.id}`, 404);

    res.json(post);
}

const deletePost = async (req, res) => {
    if (!req?.params?.id) throw Error('Post id is required', 403);

    const post = await Post.findOne({ _id: req.params.id }).exec();
    if (!post) throw Error(`No Post matches ID ${req.params.id}`, 404);

    const result = await post.deleteOne();

    if (result) {
        return res.status(200).json({ "success": `Post with ID ${req.params.id} has been deleted.`});
    };
}

module.exports = { createPost, getPosts, getPost, deletePost };


