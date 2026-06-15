const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  tip: { type: String, required: true },
  durata: { type: String, required: true },
  pret: { type: Number, default: 0 },
  disponibila: { type: Boolean, default: true },
  dataAdaugata: { type: Date, default: Date.now },
  categorie: { 
    type: String, 
    enum: ['natal', 'tranzit', 'compatibilitate', 'general'],
    default: 'general'
  },
  descriere: { type: String, match: /^.{10,}$/ },
  include: [{ type: String }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
}, { timestamps: true }); 

module.exports = mongoose.model('Session', sessionSchema);