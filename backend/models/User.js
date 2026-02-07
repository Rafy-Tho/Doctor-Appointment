const mongoose = require('mongoose');
const { defaultImage } = require('../configs/constant.js');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: { type: String, default: defaultImage },
  phone: { type: String, default: '000000000' },
  address: { type: Object, default: { line1: '', line2: '' } },
  gender: { type: String, default: 'Not Selected' },
  dob: { type: String, default: 'Not Selected' },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
