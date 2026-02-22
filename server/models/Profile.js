const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    bio: { type: String },
    image: { type: String },
    email: { type: String },
    github: { type: String },
    linkedin: { type: String },
    resumeUrl: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
