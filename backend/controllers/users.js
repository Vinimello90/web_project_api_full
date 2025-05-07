const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/NotFoundError');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
      expiresIn: '7d',
    });
    res.status(200).send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hash,
    });
    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().orFail(() => {
      throw new NotFoundError('No users found.');
    });
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).orFail(() => {
      throw new NotFoundError('No user found with the provided ID.');
    });
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.getMe = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const authenticatedUser = await User.findById(_id);
    if (!authenticatedUser) {
      throw new UnauthorizedError('Authorization required');
    }
    res.status(200).send(authenticatedUser);
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const { _id: userId } = req.user;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    ).orFail(() => {
      throw new NotFoundError('No user found with the provided ID.');
    });
    res.status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const { _id: userId } = req.user;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    ).orFail(() => {
      throw new NotFoundError('No user found with the provided ID.');
    });
    res.status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
};
