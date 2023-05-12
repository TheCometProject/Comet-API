const express = require('express');
const router = express.Router();
const { sendEmail } = require('../utils/email');
const { createError } = require("../utils/error");

router.post('/contact-us', async (req, res, next) => {

    try {

        const { name, email, subj, content } = req.body;

        const senderName = name;
        const senderEmail = email;
        const to = 'thecometproject0@gmail.com';
        const subject = subj;
        const textContent = content;

        await sendEmail(senderName, senderEmail, to, subject, textContent);

        return res
            .status(200)
            .json({ message: "Contact us email sent successfully!", name, email, to, subj, content });


    } catch (error) {

        console.error(error);
        return next(createError(500, "Internal server error"));

    }
});

module.exports = router;