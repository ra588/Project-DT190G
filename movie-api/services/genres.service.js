const Genre = require('../models/genres.model');
const CustomError = require('../utils/customError');

async function createGenre(input) {
  try {
    return Genre.create(input);
  } catch (err) {
    console.log(err.message);
  }
}

async function getAllGenre() {
  try {
    return Genre.find({});
  } catch (err) {
    console.log(err.message);
  }
}

async function findGenre(query, options = {}) {
  try {
    return Genre.findOne(query, {}, options);
  } catch (err) {
    console.log(err.message);
  }
}

async function findAndUpdateGenre(query, update, options) {
  try {
    const genre = await findGenre(query);
    if (!genre)
      return new CustomError("Genre not found", 404);
    return Genre.findOneAndUpdate(query, update, options);
  } catch (err) {
    console.log(err.message);
  }
}

async function deleteGenre(query) {
  try {
    const genre = await findGenre(query);
    if (!genre)
      return new CustomError("Genre not found", 404);
    return Genre.deleteOne(query);
  } catch (err) {
    console.log(err.messaeg);
  }
}

module.exports = { createGenre, getAllGenre, findGenre, findAndUpdateGenre, deleteGenre };
