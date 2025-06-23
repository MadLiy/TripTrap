const { body, param } = require('express-validator');

const register = [
    body('firstname')
        .notEmpty().withMessage('Le prénom est requis')
        .trim()
        .isLength({ min: 3 }).withMessage('Le prénom doit contenir au moins 3 caractères'),
    body('lastname')
        .notEmpty().withMessage('Le nom de famille est requis')
        .trim()
        .isLength({ min: 3 }).withMessage('Le nom de famille doit contenir au moins 3 caractères'),
    body('email')
        .notEmpty().withMessage('L\'email est requis')
        .isEmail().withMessage('Format d\'email invalide')
        .trim(),
    body('password')
        .notEmpty().withMessage('Le mot de passe est requis')
        .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
];

const login = [
    body('email')
        .notEmpty().withMessage('L\'email est requis')
        .isEmail().withMessage('Format d\'email invalide')
        .trim(),
    body('password')
        .notEmpty().withMessage('Le mot de passe est requis')
];

const updateProfile = [
    body('firstname')
        .optional()
        .trim()
        .isLength({ min: 3 }).withMessage('Le prénom doit contenir au moins 3 caractères'),
    body('lastname')
        .optional()
        .trim()
        .isLength({ min: 3 }).withMessage('Le nom de famille doit contenir au moins 3 caractères'),
    body('email')
        .optional()
        .isEmail().withMessage('Format d\'email invalide')
        .trim(),
];

const userId = [
    param('id')
        .isMongoId().withMessage('ID d\'utilisateur invalide')
];

module.exports = {
    register,
    login,
    updateProfile,
    userId
}; 