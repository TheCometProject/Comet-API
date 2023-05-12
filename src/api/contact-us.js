const express = require('express');
const router = express.Router();
const { sendEmail } = require('../utils/email');

router.post('/contact-us', async (req, res, next) => {

    try {

        const { name, email, content } = req.body;

        const senderName = name;
        const senderEmail = email;
        //const to = 'thecometproject0@gmail.com';
        const to = 'l.noura@esi-sba.dz';
        const subject = 'Contact Us';
        const textContent = content;

        await sendEmail(senderName, senderEmail, to, subject, textContent);

        return res
            .status(200)
            .json({ message: "Contact us email sent successfully!", name, email, content });


    } catch (error) {

        console.error(error);
        return next(createError(500, "Internal server error"));

    }
});

module.exports = router;