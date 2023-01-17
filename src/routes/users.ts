import { Router } from 'express';
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from '../controllers/userController';

const usersRoutes = Router();

usersRoutes.get('/', getUsers);

usersRoutes.get('/:id', getUser);

usersRoutes.delete('/:id', deleteUser);

usersRoutes.patch('/:id', updateUser);

export { usersRoutes };
