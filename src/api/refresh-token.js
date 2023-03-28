const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/refresh-token', async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token missing' });
        }

        const decoded = jwt.verify(refreshToken, `${process.env.JWT_REFRESH_SECRET}`);
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        const newAccessToken = jwt.sign({ id: user.id }, `${process.env.JWT_SECRET}`, { expiresIn: '15m' });
        const newRefreshToken = jwt.sign({ id: user.id }, `${process.env.JWT_REFRESH_SECRET}`, { expiresIn: '7d' });
        user.refreshToken = newRefreshToken;
        await user.save();

        res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
