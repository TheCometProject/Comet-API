const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = `${process.env.SENDINBLUE_API_KEY}`;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

async function sendEmail(senderName, senderEmail, to, subject, textContent) {

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.sender = { name: senderName, email: senderEmail };
    sendSmtpEmail.to = [{ email: to }];
    sendSmtpEmail.textContent = textContent;

    try {

        await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Email sent successfully');

    } catch (err) {

        console.log('Error sending email:', err);
        throw err;

    }
}

module.exports = { sendEmail };