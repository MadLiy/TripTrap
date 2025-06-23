const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
      type: String,
      required: true
  },
  roles: {
    type: String,
    enum: ['member', 'admin'],
    default: 'member',
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  createdAt: {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model('Users', usersSchema);