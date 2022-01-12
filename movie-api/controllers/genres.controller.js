const { createGenre, getAllGenre, findGenre, findAndUpdateGenre, deleteGenre } = require('../services/genres.service');
const CustomError = require('../utils/customError');

async function createGenreHandler(req, res, next) {
  const { name } = req.body;
  const genre = await createGenre({ name });
  if (genre instanceof CustomError)
    return next(genre);
  res.status(201).json({
    data: { genre, message: "Genre created successfully" }
  });
}

async function getGenreHandler(req, res, next) {
  const genreId = req.params.genreId;
  const genre = await findGenre(genreId, { lean: true });
  res.status(200).json({
    data: { genre, message: "" }
  });
}

async function getAllGenreHandler(req, res, next) {
  const genre = await getAllGenre();
  res.status(200).json({
    data: { genre, message: "" }
  });
}

async function updateGenreHandler(req, res, next) {
  const genreId = req.params.genreId;
  const { name } = req.body;
  const update = { name };
  const updatedGenre = await findAndUpdateGenre({ _id: genreId }, update, { new: true });
  if (updatedGenre instanceof CustomError)
    return next(updatedGenre);
  res.status(200).json({ data: { updatedGenre, message: "Updated successfully" } });
}

async function deleteGenreHandler(req, res, next) {
  const genreId = req.params.genreId;
  const result = await deleteGenre({ _id: genreId });
  if (result instanceof CustomError)
    return next(result);
  res.status(201).json({ data: { message: "Deleted successfully" } });
}

module.exports = { createGenreHandler, getAllGenreHandler, getGenreHandler, updateGenreHandler, deleteGenreHandler };
