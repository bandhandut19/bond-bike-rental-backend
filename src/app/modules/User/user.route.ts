import express from 'express';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';
import validate from '../../middlewares/validate';

const authRouter = express.Router();

authRouter.post(
  '/signup',
  validate(UserValidations.createUserValidationSchema),
  UserControllers.signUp,
);
authRouter.post('/login');

export const AuthRoutes = authRouter;

const usersRouter = express.Router();

usersRouter.get('/me');
usersRouter.put('/me');

export const UsersRoutes = usersRouter;
