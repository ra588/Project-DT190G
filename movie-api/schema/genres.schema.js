const Joi = require('joi');

const createGenreSchema = Joi.object({
  name: Joi.string().min(3).max(100).required()
});

const updateGenreSchema = Joi.object({
  name: Joi.string().min(3).max(100).required()
});

module.exports = { createGenreSchema, updateGenreSchema };
