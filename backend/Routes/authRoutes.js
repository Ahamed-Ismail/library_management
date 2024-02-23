const express = require('express');
const authController = require('../Controllers/authController');

const authrouter = express.Router();

authrouter.post('/signup', authController.signup);

authrouter.post('/userlogin', authController.userlogin);

authrouter.post('/adminlogin', authController.adminlogin);


module.exports = authrouter;