const Movie = require('../models/movie.model');
const CustomError = require('../utils/customError');

async function createMovie(input) {
  try {
    return Movie.create(input);
  } catch (err) {
    console.log(err.message);
  }
}

async function getAllMovie() {
  try {
    return Movie.find({});
  } catch (err) {
    console.log(err.message);
  }
}

async function findMovie(query, options = {}) {
  try {
    return Movie.findOne(query, {}, options);
  } catch (err) {
    console.log(err.message);
  }
}

async function findAndUpdateMovie(query, update, options) {
  try {
    const movie = await findMovie(query);
    if (!movie)
      return new CustomError("Movie not found", 404);
    return Movie.findOneAndUpdate(query, update, options);
  } catch (err) {
    console.log(err.message);
  }
}

async function deleteMovie(query) {
  try {
    const movie = await findMovie(query);
    if (!movie)
      return new CustomError("Movie not found", 404);
    return Movie.deleteOne(query);
  } catch (err) {
    console.log(err.messaeg);
  }
}

module.exports = { createMovie, getAllMovie, findMovie, findAndUpdateMovie, deleteMovie };
