const express = require('express');

const registerAPI = require('./register');
const loginAPI = require("./login");
const algerAPI = require("./alger");
const sendConfirmationAPI = require("./send-confirmation-email");
const confirmEmailAPI = require("./confirm-email");

const router = express.Router();


router.use(registerAPI);
router.use(loginAPI);
router.use(algerAPI);
router.use(sendConfirmationAPI);
router.use(confirmEmailAPI);

module.exports = router;
