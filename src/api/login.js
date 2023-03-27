const express = require("express");
const User = require("../models/user");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const router = express.Router();

require("dotenv").config();

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
});

router.post("/login", limiter, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Email or password is incorrect." });
        }

        const isMatch = await argon2.verify(user.password, password);

        if (!isMatch) {
            return res.status(400).json({ message: "Email or password is incorrect." });
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200).json({ message: "Welcome Back!", accessToken, refreshToken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
});

router.post("/token", async (req, res) => {
    const refreshToken = req.body.token;

    if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findOne({ _id: decoded.id });

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        return res.status(200).json({ accessToken });
    } catch (err) {
        logger.error(err);
        return res.status(401).json({ message: "Unauthorized" });
    }
});

module.exports = router;
