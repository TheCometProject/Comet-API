const router = require('express').Router();
const User = require('../models/user');
const argon2 = require('argon2');

router.post('/reset-password/:token', async (req, res) => {

    try {

        const { password, confirmPassword } = req.body;
        const { token } = req.params.token;

        // check for missing password or confirm password
        if (!password || !confirmPassword) {
            return res.status(400).json({ message: 'Missing password or confirm password' });
        }

        // check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const user = await User.findOne({ passwordResetToken: token, passwordResetTokenExpiration: { $gt: Date.now() } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.password = await argon2.hash(password);
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiration = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

});

module.exports = router;