const User = require('../models/user.model');
/**
 * deserializeUser that find user from database based on ther authorization token and register user inside response locals
 * @param {Requst} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns 
 */
module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return next();
  const user = await User.getUserFromToken(token);
  if (user) res.locals.user = user;
  return next();
};
