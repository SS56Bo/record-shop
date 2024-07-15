const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Always requires a title'],
    unique: true,
  },
  artist: {
    type: String,
    default: 'NA',
  },
  label: {
    type: String,
    default: 'Independent',
  },
  genre: {
    type: String,
  },
  releaseDate: {
    type: Date,
  },
  numberOfTracks: {
    type: Number,
  },
  trackListing: [String],
  description: {
    type: String,
    required: [true, 'Always requires a description'],
  },
  price: {
    type: Number,
    default: 0.0,
  },
  rating: {
    type: Number,
    default: 1.0,
  },
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
