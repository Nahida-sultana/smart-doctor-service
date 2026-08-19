const mongoose = require('mongoose');

const awarenessPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: [
        'General Health',
        'Infectious Diseases',
        'Children Health',
        'Vaccine Info',
        'Heart Health',
        'Mental Wellness',
      ],
      required: true,
    },
    imageUrl: { type: String, required: true },
    postedBy: { type: String, default: 'Dr. Ariyan Jawad' },
  },
  { timestamps: { createdAt: 'date', updatedAt: true } }
);

module.exports = mongoose.model('AwarenessPost', awarenessPostSchema);