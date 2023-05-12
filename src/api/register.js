const express = require("express");
const User = require("../models/user");
const argon2 = require("argon2");
const { check, validationResult } = require("express-validator");
const { createError } = require("../utils/error");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post(
    "/register",
    [
        check("fullName").notEmpty().withMessage("Full name is required"),
        check("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email address"),
        check("password")
            .notEmpty()
            .withMessage("Password is required")
            .isStrongPassword()
            .withMessage("Weak password"),
    ],
    async (req, res, next) => {

        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(createError(400, errors.array()));
            }

            const { fullName, email, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email }, { _id: 0, email: 1 });
            if (existingUser) {
                return next(createError(409, "User already exists"));
            }

            // Hash password
            const hashedPassword = await argon2.hash(password, {
                timeCost: 4,
                memoryCost: 2 ** 16,
                parallelism: 2,
            });

            // Create new user
            const newUser = new User({ fullName, email, password: hashedPassword });

            // Generate access token and refresh token
            const accessToken = jwt.sign({ id: newUser.id }, `${process.env.JWT_SECRET}`, {
                expiresIn: "15m",
            });
            const refreshToken = jwt.sign(
                { id: newUser.id },
                `${process.env.JWT_REFRESH_SECRET}`,
                { expiresIn: "7d" }
            );

            newUser.refreshToken = refreshToken;
            await newUser.save();

            res.status(200).json({ message: "Thank you for your registration!", fullName: newUser.fullName, accessToken, refreshToken });

        } catch (error) {

            return next(createError(500, "Cannot register user at the moment"));

        }
    }
);

module.exports = router;
