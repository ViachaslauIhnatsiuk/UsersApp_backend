const User = require('../models/userModel');
import { Types } from 'mongoose';
import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';

const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.SECRET as string, { expiresIn: '1d' });
};

const getUsers = async (request: Request, response: Response) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  response.status(200).json(users);
};

const getUser = async (request: Request, response: Response) => {
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

const signUp = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  try {
    const user = await User.signup(name, email, password);

    const token = createToken(user._id);

    response.status(200).json({ email, token });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const signIn = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  try {
    const user = await User.signin(name, email, password);

    const token = createToken(user._id);

    response.status(200).json({ email, token });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteUser = async (request: Request, response: Response) => {
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

const updateUser = async (request: Request, response: Response) => {
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

export { getUsers, getUser, signUp, signIn, deleteUser, updateUser };
