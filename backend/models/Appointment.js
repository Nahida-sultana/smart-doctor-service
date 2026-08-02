const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true, trim: true },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^[0-9+\-\s]{10,15}$/.test(v),
        message: 'Invalid phone number',
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v) => /\S+@\S+\.\S+/.test(v),
        message: 'Invalid email address',
      },
    },
    notes: { type: String, default: '' },
    date: { type: Date, required: true },
    time: { type: String, required: true }, // e.g. "10:00 AM"
    consultType: {
      type: String,
      enum: ['in-person', 'online'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'confirmed',
    },
    doctorName: { type: String, default: 'Dr. Ariyan Jawad' },
  },
  { timestamps: true }
);

// Prevent double-booking the same date + time slot
appointmentSchema.index({ date: 1, time: 1 }, { unique: false });

module.exports = mongoose.model('Appointment', appointmentSchema);