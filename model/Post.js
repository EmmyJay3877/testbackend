const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)