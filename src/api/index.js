const express = require('express');

const registerAPI = require('./register');
const loginAPI = require("./login");
const algerAPI = require("./alger");
const refreshTokenAPI = require("./refresh-token");

const router = express.Router();


router.use(registerAPI);
router.use(loginAPI);
router.use(algerAPI);
router.use(refreshTokenAPI);

module.exports = router;
