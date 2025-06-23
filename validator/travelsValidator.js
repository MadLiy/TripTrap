const { body, param } = require('express-validator');

const createTravel = [
  body('departure').notEmpty().withMessage('Le lieu de départ est requis'),
  body('destination').notEmpty().withMessage('La destination est requise'),
  body('departureDateTime').notEmpty().withMessage('Date de départ requise').isISO8601(),
  body('arrivalDateTime').notEmpty().withMessage('Date d\'arrivée requise').isISO8601(),
  body('price').notEmpty().withMessage('Le prix est requis').isNumeric(),
  body('places').notEmpty().withMessage('Le nombre de places est requis').isInt({ min: 1 }),
];

const travelId = [
  param('id').isMongoId().withMessage('ID de voyage invalide')
];

module.exports = { createTravel, travelId };