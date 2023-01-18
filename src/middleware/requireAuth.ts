const User = require('../models/userModel');
import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const requireAuth = async (
  request: any,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(
      token,
      process.env.SECRET as string
    ) as JwtPayload;

    request.user = await User.findOne({ _id }).select('_id');
    next();
  } catch (error) {
    console.log(error);
    response.status(404).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;
