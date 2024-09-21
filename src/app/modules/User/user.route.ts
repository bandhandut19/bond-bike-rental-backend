import express from 'express';
import { UserControllers } from './user.controller';
import { AuthValidations, UserValidations } from './user.validation';
import validate from '../../middlewares/validate';
import auth from '../../middlewares/auth';
import { UserRoles } from './user.constant';

const authRouter = express.Router();

authRouter.post(
  '/signup',
  validate(UserValidations.signUpUserValidationSchema),
  UserControllers.signUp,
);
authRouter.post(
  '/login',
  validate(AuthValidations.loginValidationSchema),
  UserControllers.login,
);
authRouter.post(
  '/refresh-token',
  validate(AuthValidations.refreshTokenValidationSchema),
  UserControllers.refreshToken,
);

export const AuthRoutes = authRouter;

const usersRouter = express.Router();

usersRouter.get(
  '/me',
  auth(UserRoles.ADMIN, UserRoles.USER),
  UserControllers.getProfile,
);
usersRouter.get(
  '/allusers',
  auth(UserRoles.ADMIN),
  UserControllers.getAllUsers,
);
usersRouter.delete('/:id', auth(UserRoles.ADMIN), UserControllers.deleteUser);
usersRouter.put(
  '/user/:id',
  auth(UserRoles.ADMIN),
  UserControllers.promoteUserToAdmin,
);
usersRouter.put(
  '/me',
  auth(UserRoles.ADMIN, UserRoles.USER),
  validate(UserValidations.updateUserValidationSchema),
  UserControllers.updateProfile,
);

export const UsersRoutes = usersRouter;
