const User = require('../models/user.model');
const CustomError = require('../utils/customError');

async function createUser(input) {
  try {
    const { email } = input;
    const userFound = await User.findOne({ email });
    if (userFound) {
      return new CustomError("User is already found", 400);
    }
    return User.create(input);
    
  } catch (err) {
    console.log(err.message);
  }
}

async function getAllUser() {
  try {
    return User.find({});
  } catch (err) {
    console.log(err.message);
  }
}

async function findUser(query, options = {}) {
  try {
    return User.findOne(query, {}, options);
  } catch (err) {
    console.log(err.message);
  }
}

async function findAndUpdateUser(query, update, options) {
  try {
    const user = await findUser(query);
    if (!user)
      return new CustomError("User not found", 404);
    return User.findOneAndUpdate(query, update, options);
  } catch (err) {
    console.log(err.message);
  }
}

async function deleteUser(query) {
  try {
    const user = await findUser(query);
    if (!user)
      return new CustomError("User not found", 404);
    return User.deleteOne(query);
  } catch (err) {
    console.log(err.messaeg);
  }
}

module.exports = { createUser, getAllUser, findUser, findAndUpdateUser, deleteUser };
