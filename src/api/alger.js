const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
    "/alger",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.send("Welcome to Alger");
    }
);

module.exports = router;