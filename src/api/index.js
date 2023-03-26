const express = require('express');

const registerAPI = require('./register');
const loginAPI = require("./login");
const algerAPI = require("./alger");

const router = express.Router();


router.use(registerAPI);
router.use(loginAPI);
router.use(algerAPI);

module.exports = router;
