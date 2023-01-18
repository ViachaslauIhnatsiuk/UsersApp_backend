import { Router } from 'express';
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from '../controllers/userController';
const requireAuth = require('../middleware/requireAuth');

const usersRoutes = Router();

usersRoutes.use(requireAuth);

usersRoutes.get('/', getUsers);

usersRoutes.get('/:id', getUser);

usersRoutes.delete('/:id', deleteUser);

usersRoutes.patch('/:id', updateUser);

export { usersRoutes };
