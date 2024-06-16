import express from 'express';
import { UserControllers } from './user.controller';

const authRouter = express.Router();

authRouter.post('/signup', UserControllers.signUp);
authRouter.post('/login');

export const AuthRoutes = authRouter;

const usersRouter = express.Router();

usersRouter.get('/me');
usersRouter.put('/me');

export const UsersRoutes = usersRouter;
