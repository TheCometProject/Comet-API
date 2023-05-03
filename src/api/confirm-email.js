const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { createError } = require("../utils/error");


router.get('/confirm-email/:confirmationToken', async (req, res, next) => {

    const { confirmationToken } = req.params;

    // find user with matching confirmation token
    const user = await User.findOne({ confirmationToken: confirmationToken });

    if (!user) {
        return next(createError(400, "Invalid confirmation token"));
    }

    user.confirmationToken = undefined;
    user.isEmailConfirmed = true;
    await user.save();

    res.status(200).send('Email confirmed successfully');

});

module.exports = router;