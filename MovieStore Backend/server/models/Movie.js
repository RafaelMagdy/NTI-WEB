const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 5
  },
  director: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'drama', 'comedy', 'action', 'thriller', 'horror',
      'romance', 'sci-fi', 'historical', 'documentary'
    ]
  },
  photo: {
    type: String
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for text search
MovieSchema.index({
  name: 'text',
  director: 'text',
  description: 'text',
  type: 'text'
});

module.exports = mongoose.model('Movie', MovieSchema);