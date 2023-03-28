const express = require('express');
const router = express.Router();
const nodeMailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');

router.post('/send-confirmation-email', async (req, res) => {

    const { email } = req.body;

    // generate unique token
    const confirmationToken = uuidv4();

    // save confirmation token to user
    await User.findOneAndUpdate({ email: email }, { confirmationToken: confirmationToken });

    // send confirmation email
    const sendinBlueTransport = require('nodemailer-sendinblue-transport');

    const transporter = nodeMailer.createTransport(
        sendinBlueTransport({
            apiKey: `${process.env.SENDINBLUE_API_KEY}`,
        })
    );


    const mailOptions = {
        from: 'The Comet Project <thecometproject0@gmail.com>',
        to: email,
        subject: 'Confirm your email',
        text: 'Please click on the following link to confirm your email: http://localhost:3000/confirm-email/' + confirmationToken,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error sending confirmation email');
        } else {
            console.log('Confirmation email sent: ' + info.response);
            res.status(200).send('Confirmation email sent');
        }
    });
});

module.exports = router;