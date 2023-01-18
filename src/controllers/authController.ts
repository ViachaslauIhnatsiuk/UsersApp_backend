const User = require('../models/userModel');
import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';

const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.SECRET as string, { expiresIn: '1d' });
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
  const { email, password } = request.body;

  try {
    const user = await User.signin(email, password);
    const token = createToken(user._id);

    response.status(200).json({ email, id: user._id, token });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

export { signUp, signIn };
