const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
