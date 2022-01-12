const mongoose = require('mongoose');
const { omit } = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');
const { saltRounds, jwtSecret } = require('../config');

const signJWT = util.promisify(jwt.sign);
const verifyJWT = util.promisify(jwt.verify);

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Movie",
    }
  ],
  role: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User'
  }
}, {
  toJSON: {
    transform: (doc, ret) => omit(ret, ["__v", "password"])
  }
});

userSchema.pre('save', async function () {
  const currentDocument = this;
  if (currentDocument.isModified('password')) {
    currentDocument.password = await bcrypt.hash(currentDocument.password, parseInt(saltRounds));
  }
});

userSchema.methods.checkPassword = async function (plainPassword) {
  const currentDocument = this;
  return bcrypt.compare(plainPassword, currentDocument.password);
};

userSchema.methods.generateToken = function () {
  const currentDocument = this;
  return signJWT({ id: currentDocument.id }, jwtSecret, { expiresIn: "10d" });
};

userSchema.statics.getUserFromToken = async function (token) {
  const User = this;
  const { id } = await verifyJWT(token, jwtSecret);
  const user = await User.findById(id)
    .populate({ path: 'likes', populate: { path: 'likes', select: "title poster" } })
    .select("-__v -password");
  return user;
};

userSchema.methods.print = function () {
  console.log(this);
};
userSchema.queue('print', []);

const User = mongoose.model('User', userSchema);

User.on('index', (err) => {
  console.error(err);
});


module.exports = User;
