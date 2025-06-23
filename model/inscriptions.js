const mongoose = require('mongoose');

const inscriptionsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    travel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Travels'
    },
    acomptePaid: {
        type: Boolean,
        default: false
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'canceled'],
        default: 'pending'
    },
    document: [
    {
        title: String,
        url: String
    }
    ],
});

module.exports = mongoose.model('Inscriptions', inscriptionsSchema);