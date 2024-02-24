const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferenceSchema = new Schema({
  id_client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  id_service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  etoile:{ type: Number, required: true },
}, { collection: 'preference' }); // Spécification du nom de la collection

const Preference = mongoose.model('Preference', preferenceSchema);

module.exports = Preference;