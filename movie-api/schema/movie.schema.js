const Joi = require('joi');
const JoyObjectId = require('joi-objectid');
const myJoiObjectId = JoyObjectId(Joi);


const createMovieSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(5).max(5000).required(),
  poster: Joi.string().uri().min(10).max(1000).required(),
  genres: Joi.array().items(myJoiObjectId()).min(1).required(),
  rating: Joi.number().required(),
  director: Joi.string().min(3).max(100).required()
});

const updateMovieSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(5).max(5000).required(),
  poster: Joi.string().uri().min(10).max(1000).required(),
  genres: Joi.array().items(myJoiObjectId()).min(1).required(),
  rating: Joi.number().required(),
  director: Joi.string().min(3).max(100).required()
});

module.exports = { createMovieSchema, updateMovieSchema };
