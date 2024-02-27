const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  // image: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: String, required: true },
  price: { type: Number, required: true },
  commission: { type: Number, required: true },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;



