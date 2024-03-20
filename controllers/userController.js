const User = require('../model/User');

const updatePassword = async (req, res) => {
    const user = await User.findOne({ username: req.body.username }).select('+password').exec();

    // check if current user password is correct
    if (!user || !await user.comparePassword(req.body.oldPassword, user.password)) {
        throw Error('Password is incorrect', 401);
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({ "message": "successlly updated your password" });
};

module.exports = { updatePassword };
