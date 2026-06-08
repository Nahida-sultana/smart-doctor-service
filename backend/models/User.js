const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
name: {
    type: String,
    required: true
},
phone: { type: String, unique: true },
password: {
    type: String,
    required: true
},
role: {
    type: String,
    enum: ['patient', 'doctor', 'admin'],
    default: 'patient'
  },   // ✅ comma here
resetToken: { type: String },
resetTokenExpiry: { type: Date },
},
{ timestamps: true });

module.exports = mongoose.model('User', UserSchema);