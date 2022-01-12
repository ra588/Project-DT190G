const express = require('express');
const validateBody = require('../middlewares/validateBody');
const validateId = require('../middlewares/validateId');
const requireAdmin = require('../middlewares/requireAdmin');
const { createGenreHandler, getAllGenreHandler, getGenreHandler, updateGenreHandler, deleteGenreHandler } = require('../controllers/genres.controller');
const { createGenreSchema, updateGenreSchema } = require('../schema/genres.schema');

const router = express.Router();

router.get(
  '/',
  requireAdmin,
  getAllGenreHandler
);

router.post(
  '/',
  requireAdmin,
  validateBody(createGenreSchema),
  createGenreHandler
);

router.put(
  '/:genreId',
  requireAdmin,
  validateId('genreId'),
  validateBody(updateGenreSchema),
  updateGenreHandler
);

router.delete(
  '/:genreId',
  requireAdmin,
  validateId('genreId'),
  deleteGenreHandler
);

module.exports = router;
