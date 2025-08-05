const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['admin', 'doctor', 'patient'], default: 'patient' },
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.correctPassword = async function (candidate, stored) {
  return await bcrypt.compare(candidate, stored);
};

module.exports = mongoose.model('User', userSchema);
