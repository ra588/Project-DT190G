const { createMovie, getAllMovie, findMovie, findAndUpdateMovie, deleteMovie } = require('../services/movie.service');
const CustomError = require('../utils/customError');

async function createMovieHandler(req, res, next) {
  const { title, description, poster, genres, rating, director } = req.body;
  const movie = await createMovie({ title, description, poster, genres, rating, director });
  if (movie instanceof CustomError)
    return next(movie);
  res.status(201).json({
    data: { movie, message: "movie created successfully" }
  });
}

async function getMovieHandler(req, res, next) {
  const movieId = req.params.movieId;
  const movie = await findMovie(movieId, { lean: true });
  res.status(200).json({
    data: { movie, message: "" }
  });
}

async function getAllMovieHandler(req, res, next) {
  const movies = await getAllMovie();
  res.status(200).json({
    data: { movies, message: "" }
  });
}

async function updateMovieHandler(req, res, next) {
  const movieId = req.params.movieId;
  const { title, description, poster, genres, rating, director } = req.body;
  const update = { title, description, poster, genres, rating, director };
  const updatedMovie = await findAndUpdateMovie({ _id: movieId }, update, { new: true });
  if (updatedMovie instanceof CustomError)
    return next(updatedMovie);
  res.status(200).json({ data: { updatedMovie, message: "Updated successfully" } });
}

async function deleteMovieHandler(req, res, next) {
  const movieId = req.params.movieId;
  const result = await deleteMovie({ _id: movieId });
  if (result instanceof CustomError)
    return next(result);
  res.status(201).json({ data: { message: "Deleted successfully" } });
}

module.exports = { createMovieHandler, getAllMovieHandler, getMovieHandler, updateMovieHandler, deleteMovieHandler };
