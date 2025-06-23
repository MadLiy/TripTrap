const express = require('express');
const authRouter = express.Router();
const authController = require('../controller/authController');

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

authRouter.get('/register', authController.showRegisterForm);
authRouter.get('/login', authController.showLoginForm);
authRouter.get('/logout', authController.logout);
module.exports = authRouter;
