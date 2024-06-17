import config from '../../config';
import { TAuth, TUser } from './user.interface';
import { User } from './user.model';
import jwt from 'jsonwebtoken';
const signUp = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};
const login = async (payload: TAuth) => {
  const { email, password } = payload;
  // checking is user is valid through checking email
  const user = await User.findOne({ email: email }).select('+password');
  if (!user) {
    throw new Error('Email not found');
  }
  // checking password
  const hashedPassword = user?.password;
  if (!(await User.isValidPassword(password, hashedPassword))) {
    throw new Error('Password is incorrect');
  }

  const jwtPayload = {
    user_email: user?.email,
    user_role: user?.role,
  };
  const userAccessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_secret_key as string,
    {
      expiresIn: '5d',
    },
  );
  console.log(jwt.decode(userAccessToken));
  return {
    userAccessToken,
  };
};

export const UserServices = {
  signUp,
  login,
};
