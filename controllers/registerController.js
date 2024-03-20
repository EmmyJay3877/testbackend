const User = require('../model/User');
const createRefreshAndAccessToken = require('../utils/createToken');

const handleNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!(username && password)) throw Error('Form is incomplete.', 400);

    // check if user exists already in the DB
    const foundUser = await User.findOne({ username }).exec();
    if (foundUser) throw new Error('Conflict. User already exists.', 409);

    // create and save new User
    const newUser = await User.create({
        "username": username,
        "password": password
    })

    if (!newUser) throw new Error('Could not create new user', 204);

    const { accessToken, refreshToken } = await createRefreshAndAccessToken(username);

    // saving refresh token with current user
    const result = await User.findOneAndUpdate(
        { username },
        { refreshToken: refreshToken },
        { runValidators: true }
    );

    if (result) {
        try {
            // Creates secure httpOnly cookie with refresh token
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

            res.status(201).json({
                "message": `New User ${username} created.`,
                accessToken
            });
        } catch (error) {
            await newUser.deleteOne();
            throw new Error('Failed to create account, pls try again.', 500);
        }
    };
};

module.exports = { handleNewUser };