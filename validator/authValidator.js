const { body } = require('express-validator');

// Validation pour l'inscription (register)
const register = [
  body('firstname')
    .isLength({ min: 3 })
    .withMessage('Le prénom doit faire au moins 3 caractères'),
  body('lastname')
    .isLength({ min: 3 })
    .withMessage('Le nom doit faire au moins 3 caractères'),
  body('email')
    .isEmail()
    .withMessage('Email invalide'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit faire au moins 6 caractères'),
];

// Validation pour la connexion (login)
const login = [
  body('email')
    .isEmail()
    .withMessage('Email invalide'),
  body('password')
    .notEmpty()
    .withMessage('Le mot de passe est requis'),
];

module.exports = {
  register,
  login
};