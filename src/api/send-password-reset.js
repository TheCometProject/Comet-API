const router = require('express').Router();
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { body } = require('express-validator');
const { sendEmail } = require('../utils/email');
const { createError } = require("../utils/error");


router.post('/forgot-password', body('email').isEmail().withMessage('Invalid email address'), async (req, res, next) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return next(createError(404, "User not found"));
        }

        const token = uuidv4();
        const expirationTime = Date.now() + 3600000; // 1 hour from now

        user.passwordResetToken = token;
        user.passwordResetTokenExpiration = expirationTime;
        await user.save();

        // send email
        const senderName = 'The Comet Project';
        const senderEmail = 'thecometproject0@gmail.com';
        const subject = 'Reset Password';
        const to = email;
        const textContent = 'Please click on the following link to reset your password: http://localhost:4000/api/v1/reset-password/' + token;

        await sendEmail(senderName, senderEmail, to, subject, textContent);

        res.status(200).send('Password reset email sent');

    } catch (error) {

        console.error(error);
        return next(createError(500, "Internal server error"));

    }

});

module.exports = router;