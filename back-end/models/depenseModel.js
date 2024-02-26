const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const depenseSchema = new Schema({
    type: { type: String, enum: ['Salaire', 'Loyer', 'Achat pièce', 'Autres dépenses'] },
    date: { type: Date, required: true },
    prix: {type:Number, required: true}
}, { collection: 'depenses' }); // Spécification du nom de la collection

const Depense = mongoose.model('Depense', depenseSchema);

module.exports = Depense;

