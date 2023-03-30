const express = require("express");
const User = require("../models/user");
const router = express.Router();
const passport = require("passport");

router.post("/logout", passport.authenticate("jwt", { session: false }), async (req, res, next) => {

    try {

        // Find the user in the database
        const user = await User.findById(req.user.id);
        if (!user) {
            return next(createError(400, "User not found"));
        }

        // Delete the refresh token from the database
        user.refreshToken = undefined;
        await user.save();

        res.status(200).json({ message: "Logout successful" });

    } catch (error) {

        console.error(error);
        return next(createError(500, "Internal server Error"));

    }
});

module.exports = router;