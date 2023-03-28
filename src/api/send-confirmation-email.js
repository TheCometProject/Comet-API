const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const { sendEmail } = require('../utils/email');

router.post('/send-confirmation-email', async (req, res) => {

    try {

        const { email } = req.body;

        // generate unique token
        const confirmationToken = uuidv4();

        // save confirmation token to user
        await User.findOneAndUpdate({ email: email }, { confirmationToken: confirmationToken });


        const senderName = 'The Comet Project';
        const senderEmail = 'thecometproject0@gmail.com';
        const subject = 'Confirm your email';
        const to = email;
        const textContent = 'Please click on the following link to confirm your email: http://localhost:5000/api/v1/confirm-email/' + confirmationToken;

        await sendEmail(senderName, senderEmail, to, subject, textContent);

        res.status(200).send('Confirmation email sent');

    } catch (error) {

        res.status(500).send('Internal server error');

    }
});

module.exports = router;