const mongoose = require('mongoose');

const programareSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  data: { type: Date, required: true },
  ora: { type: String, required: true },
  userEmail: { type: String, required: true },
  status: { type: String, default: 'în așteptare' }
}, { timestamps: true });

module.exports = mongoose.model('Programare', programareSchema);