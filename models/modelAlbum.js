const mongoose = require('mongoose');
const slugify = require('slugify');

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
    default: 5,
  },
  trackListing: [String],
  imgLocation: [String],
  description: {
    type: String,
    required: [true, 'Always requires a description'],
  },
  price: {
    type: Number,
    default: 0,
  },
  versionAvailable: [String],
  rating: {
    type: Number,
    default: 1.0,
    min: [1.0, 'Rating must be above 1'],
    max: [5.0, 'Rating must be below 5'],
  },
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
