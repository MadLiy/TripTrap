const express = require('express');
const authRouter = express.Router();
const authController = require('../controller/authController');
const { register, login } = require('../validator/authValidator');
const validate = require('../validator/validate');

// Affichage des formulaires (routes statiques)
authRouter.get('/register', authController.showRegisterForm);
authRouter.get('/login', authController.showLoginForm);

// Actions d'authentification (routes dynamiques)
authRouter.post('/register', register, validate, authController.register);
authRouter.post('/login', login, validate, authController.login);

// Déconnexion
authRouter.get('/logout', authController.logout);

module.exports = authRouter;