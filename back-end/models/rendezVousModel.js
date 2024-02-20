const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rendezVousSchema = new Schema({
  id_client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  id_employé: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  id_service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  date: { type: Date, required: true },
  etat: { type: Boolean, default: false }
}, { collection: 'rendez_vous' }); // Spécification du nom de la collection

const RendezVous = mongoose.model('RendezVous', rendezVousSchema);

module.exports = RendezVous;

