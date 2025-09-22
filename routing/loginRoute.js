const express = require("express");
const router = express.Router()

const { login, signUp } = require("../controllers/loginController")



router.route('/login').post(login);
router.route('/signup').post(signUp);

module.exports = router 