const { createUser, getAllUser, findUser, findAndUpdateUser, deleteUser } = require('../services/user.service');
const CustomError = require('../utils/customError');

async function createUserHandler(req, res, next) {
  const { firstName, lastName, email, password, avatar } = req.body;
  const user = await createUser({ firstName, lastName, email, password, avatar });
  console.log(user instanceof CustomError);
  if (user instanceof CustomError)
    return next(user);
  res.status(201).json({
    data: { user, message: "user created successfully" }
  });
}

async function getUserHandler(req, res, next) {
  const user = res.locals.user;
  res.status(200).json({
    data: { user, message: "" }
  });
}

async function getAllUserHandler(req, res, next) {
  const users = await getAllUser();
  res.status(200).json({
    data: { users, message: "" }
  });
}

async function loginUserHandler(req, res, next) {
  const { email, password } = req.body;
  const user = await findUser({ email });
  console.log({ user });
  if (!user)
    return next(new CustomError('Wrong username or password', 401));
  const isMatch = await user.checkPassword(password);
  if (!isMatch)
    return next(new CustomError('Wrong username or password', 401));
  const token = await user.generateToken();
  res.status(200).json({
    data: {
      user,
      token,
      message: 'Hello again'
    }
  });
}

async function updateUserHandler(req, res, next) {
  const userId = req.params.userId;
  const { firstName, lastName, password, avatar } = req.body;
  const update = { firstName, lastName, password, avatar };
  const updatedUser = await findAndUpdateUser({ _id: userId }, update, { new: true });
  if (updatedUser instanceof CustomError)
    return next(updatedUser);
  res.status(200).json({ data: { updatedUser, message: "updated successfully" } });
}

async function deleteUserHandler(req, res, next) {
  const userId = req.params.userId;
  const result = await deleteUser({ _id: userId });
  if (result instanceof CustomError)
    return next(result);
  res.status(201).json({ data: { message: "deleted successfully" } });
}

module.exports = { createUserHandler, getAllUserHandler, getUserHandler, loginUserHandler, updateUserHandler, deleteUserHandler };
