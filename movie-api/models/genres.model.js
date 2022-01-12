const mongoose = require('mongoose');
const { omit } = require('lodash');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, {
  toJSON: {
    transform: (doc, ret) => omit(ret, "__v")
  }
});

const Genre = mongoose.model("Gener", genreSchema);

module.exports = Genre;
