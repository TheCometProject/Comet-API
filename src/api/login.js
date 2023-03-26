const express = require("express");
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const router = express.Router();

require('dotenv').config();

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const userWithEmail = await User.findOne({ email }).catch((err) => {
            console.log("Error: ", err);
        });

        if (!userWithEmail) {
            return res.status(400).json({ message: "Email or password does not match!" });
        }

        if (userWithEmail.password !== password)
            return res.status(400).json({ message: "Email or password does not match!" });

        const jwtToken = jwt.sign({ id: userWithEmail.id, email: userWithEmail.email }, `${process.env.JWT_SECRET_KEY}`);

        res.json({ message: "Welcome Back!", token: jwtToken });

    } catch (err) {
        res.json("Error : ", err.message);
    }
});

module.exports = router;