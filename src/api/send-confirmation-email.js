const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = `${process.env.SENDINBLUE_API_KEY}`;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

router.post('/send-confirmation-email', async (req, res) => {

    const { email } = req.body;

    // generate unique token
    const confirmationToken = uuidv4();

    // save confirmation token to user
    await User.findOneAndUpdate({ email: email }, { confirmationToken: confirmationToken });

    // send confirmation email
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = 'Confirm your email';
    sendSmtpEmail.sender = { name: 'The Comet Project', email: 'thecometproject0@gmail.com' };
    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.textContent = 'Please click on the following link to confirm your email: http://localhost:5000/api/v1/confirm-email/' + confirmationToken;


    apiInstance.sendTransacEmail(sendSmtpEmail).then(() => {
        console.log('Confirmation email sent');
        res.status(200).send('Confirmation email sent');
    }).catch((err) => {
        console.log(err);
        res.status(500).send('Error sending confirmation email');
    });
});

module.exports = router;
