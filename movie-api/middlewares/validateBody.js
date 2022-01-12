const CustomError = require('../utils/customError');
/**
 * 
 * @param {Joi.ObjectSchema} schema input schema
 * @returns {NextFunction} next continue function
 */
module.exports = schema => async (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error) {
    const error = new CustomError('Validation Error', 422, result.error);
    return next(error);
  }
  return next();
}
