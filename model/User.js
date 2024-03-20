const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [8, 'Password should be more than 8 characters!'],
        select: false //password will not show up in any output
    },
    refreshToken: {
        type: String,
        validate: [validator.isJWT, 'invalid token!']
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) { //run this funtion if password was modified
    if (!this.isModified('password')) return next(); //exit this function and call the next middleware

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();
});

// create a user instance method, which is available for all documents in the user collection.
userSchema.methods.comparePassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);