const User = require('../models/userModel');
const { Types } = require('mongoose');

const getUsers = async (request, response) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  response.status(200).json(users);
};

const getUser = async (request, response) => {
  const { id } = request.params;

  if (!Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: 'No such user' });
  }

  const user = await User.findById(id);

  if (!user) {
    return response.status(404).json({ error: 'No such user' });
  }

  response.status(200).json(user);
};

const createUser = async (request, response) => {
  const { name, email, password } = request.body;

  try {
    const user = await User.create({ name, email, password });
    response.status(200).json(user);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteUser = async (request, response) => {
  const { id } = request.params;

  if (!Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: 'No such user' });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return response.status(404).json({ error: 'No such user' });
  }

  response.status(200).json(user);
};

const updateUser = async (request, response) => {
  const { id } = request.params;

  if (!Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: 'No such user' });
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...request.body,
    }
  );

  if (!user) {
    return response.status(404).json({ error: 'No such user' });
  }

  response.status(200).json(user);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
