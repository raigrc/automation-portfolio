const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Languages', 'AI Models', 'Automation Tools', 'CI/CD', 'Databases', 'Other'],
    },
    level: { type: Number, min: 1, max: 100, default: 80 },
    icon: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
