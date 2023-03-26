const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Validate input data
        if (!fullName || !email || !password) {
            return res
                .status(400)
                .json({ error: "Please provide all required fields" });
        }

        // Validate email address
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email address" });
        }

        // Validate password strength
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: "Weak password" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({ fullName, email, password: hashedPassword });
        await newUser.save();

        res.json({ message: "Thank you for your registration!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Cannot register user at the moment" });
    }
});

module.exports = router;
