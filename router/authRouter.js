const express = require('express');
const authRouter = express.Router();
const authController = require('../controller/authController');

// Affichage des formulaires (routes statiques)
authRouter.get('/register', authController.showRegisterForm);
authRouter.get('/login', authController.showLoginForm);

// Actions d'authentification (routes dynamiques)
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

// Déconnexion
authRouter.get('/logout', authController.logout);

module.exports = authRouter;