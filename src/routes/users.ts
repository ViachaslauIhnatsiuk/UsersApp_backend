import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from '../controllers/userController';

const usersRoutes = Router();

usersRoutes.get('/', getUsers);

usersRoutes.get('/:id', getUser);

usersRoutes.post('/', createUser);

usersRoutes.delete('/:id', deleteUser);

usersRoutes.patch('/:id', updateUser);

export { usersRoutes };
