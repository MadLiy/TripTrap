const { body, param } = require('express-validator');

const createInscription = [
  body('travel').notEmpty().withMessage('Le voyage est requis').isMongoId(),
];

const inscriptionId = [
  param('id').isMongoId().withMessage('ID d\'inscription invalide')
];

module.exports = { createInscription, inscriptionId };