const Post = require('../model/Post');
const User = require('../model/User');

const createPost = async (req, res) => {
    const { text } = req.body;
    if (!text) throw new customError('Post is empty', 400);

    // create a new post
    const newPost = await Post.create({
        "profile": req.user._id,
        "text": text,
    });

    if (newPost) {
        // updating the post array in the User document
        const userUpdate = await User.updateOne({ "_id": req.user._id }, { $push: { posts: { $each: [newPost._id] } } });

        // checking if the User document was updated
        if (userUpdate.matchedCount > 0 && userUpdate.modifiedCount > 0) {
            res.status(201).json({ "success": `${req.user.username} just made a post` })
        };
    };

}


