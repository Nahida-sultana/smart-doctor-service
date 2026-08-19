const mongoose = require('mongoose');

const bulletinSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['article', 'video', 'tips', 'infographic'],
      required: true,
    },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true },
    category: {
      type: String,
      enum: [
        'General Medicine',
        'Paediatrics',
        'Diabetes',
        'Skin Care',
        'Rheumatic',
        'Mental Health',
        'Nutrition',
        'Seasonal',
      ],
      required: true,
    },
    imageUrl: { type: String, required: true },
    videoUrl: { type: String }, // only used when type === 'video'
    tips: [{ type: String }], // only used when type === 'tips'
    readTime: { type: String, default: '' },
    author: { type: String, default: 'Dr. Ariyan Jawad' },
  },
  { timestamps: { createdAt: 'date', updatedAt: true } }
);

module.exports = mongoose.model('Bulletin', bulletinSchema);