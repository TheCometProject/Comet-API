const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
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

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Email or password is incorrect." });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        return res.status(200).json({ message: "Welcome Back!", token: token });
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
