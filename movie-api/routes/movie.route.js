const express = require('express');
const validateBody = require('../middlewares/validateBody');
const validateId = require('../middlewares/validateId');
const requireAdmin = require('../middlewares/requireAdmin');
const { createMovieSchema, updateMovieSchema } = require('../schema/movie.schema');
const { createMovieHandler, getAllMovieHandler, getMovieHandler, updateMovieHandler, deleteMovieHandler } = require('../controllers/movie.controller');

const router = express.Router();

router.get(
  '/',
  getAllMovieHandler
);

router.get(
  '/:movieId',
  validateId('movieId'),
  getMovieHandler
);

router.post(
  '/',
  requireAdmin,
  validateBody(createMovieSchema),
  createMovieHandler
);

router.put(
  '/:movieId',
  requireAdmin,
  validateId('movieId'),
  validateBody(updateMovieSchema),
  updateMovieHandler
);

router.delete(
  '/:movieId',
  requireAdmin,
  validateId('movieId'),
  deleteMovieHandler
);

module.exports = router;
