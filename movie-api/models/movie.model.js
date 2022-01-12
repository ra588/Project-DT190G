const mongoose = require('mongoose');
const { omit } = require('lodash');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  genres: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Genre",
      required: true
    }
  ],
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  ],
  rating: {
    type: Number,
    required: true
  },
  director: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform: (doc, ret) => omit(ret, "__v")
  }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
