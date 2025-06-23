const mongoose = require('mongoose');

const travelsSchema = new mongoose.Schema({
  departureDateTime: {
      type: Date,
      required: true
  },
  arrivalDateTime: {
      type: Date,
      required: true
  },
  departure: {
    type: String,
    required: true
  },
  destination: {
      type: String,
      required: true
  },
  price: {
      type: Number,
      required: true
  },
  status: {
      type: String,
      enum: ['available', 'booked', 'canceled'],
      default: 'available'
  },
  places: {
      type: Number,
      required: true
  },
  inscription: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inscriptions',
  }],
  requiredDocuments: [{
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String
    }
  }],
});

// Export du modèle
module.exports = mongoose.model('Travels', travelsSchema);