const express = require("express");
const User = require("../models/user");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const { createError } = require("../utils/error");
const router = express.Router();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // limit each IP to 15 requests per windowMs
});

router.post("/login", limiter, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(createError(400, "Email or password is incorrect."));
    }

    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
      return next(createError(400, "Email or password is incorrect."));
    }

    const accessToken = jwt.sign({ id: user.id }, `${process.env.JWT_SECRET}`, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { id: user.id },
      `${process.env.JWT_REFRESH_SECRET}`,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({
      message: "Welcome Back!",
      fullName: user.fullName,
      email: user.email,
      accessToken,
      refreshToken,
      profilePic: user.profilePic,
    });
  } catch (err) {
    return next(createError(500, "Server Error"));
  }
});

module.exports = router;
