const express = require('express');

const registerAPI = require('./register');
const loginAPI = require("./login");
const algerAPI = require("./alger");
const logoutAPI = require("./logout");
const sendConfirmationAPI = require("./send-confirmation-email");
const confirmEmailAPI = require("./confirm-email");
const refreshTokenAPI = require("./refresh-token");


const router = express.Router();


router.use(registerAPI);
router.use(loginAPI);
router.use(algerAPI);
router.use(logoutAPI);
router.use(sendConfirmationAPI);
router.use(confirmEmailAPI);
router.use(refreshTokenAPI);


module.exports = router;
