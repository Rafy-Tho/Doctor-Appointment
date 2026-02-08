const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, validate: [validator.isEmail, 'Invalid email address'] ,lowercase: true,},
  password: { type: String, required: true, select: false, minlength: [8, 'Password must be at least 8 characters long'],validate: [validator.isStrongPassword, 'Password must be strong'] },
  role: { type: String, default: 'admin' },
})
// Hash password before saving
adminSchema.pre('save', async function () {
  // Only hash if password is new or modified
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// Compare password method
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
// Generate JWT token
adminSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
