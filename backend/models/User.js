const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:       { type: String, required: true, trim: true },
    phone:      { type: String, required: true, unique: true },
    password:   { type: String, required: true },
    age:        { type: Number, required: true },
    height:     { type: Number, required: true }, // in cm
    weight:     { type: Number, required: true }, // in kg
    occupation: { type: String, required: true, trim: true },
    gender:     { type: String, required: true, enum: ['male', 'female', 'other'] },
    role:       { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },

  // for forgot password
resetToken:       { type: String },
resetTokenExpiry: { type: Date },

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);