const CustomError = require("../utils/customError");

module.exports = (req, res, next) => {
  const user = res.locals.user;
  if (!user)
    return next(new CustomError('user is required', 403));
  if (!(user.role === 'Admin'))
    return next(new CustomError('You are not admin', 403));
  return next()

};
