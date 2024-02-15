const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Manager', 'Client', 'Employee'], default: 'Client' },
  number: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
