const mongoose = require('mongoose');
const CustomError = require('../utils/customError');

module.exports = (...idParams) => async (req, res, next) => {
  idParams.forEach(idName => {
    const id = req.params[idName];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new CustomError(`the path ${idName} id is not a valid object id`, 400);
      return next(error);
    }
    next();
  });
};