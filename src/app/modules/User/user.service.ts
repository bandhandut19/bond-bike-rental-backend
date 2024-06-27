import httpStatus from 'http-status';
import config from '../../config';
import HelperError from '../../errors/HelperError';
import { TAuth, TUser } from './user.interface';
import { User } from './user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
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
    throw new Error('Password is incorrect1');
  }

  const jwtPayload = {
    user_email: user?.email,
    user_role: user?.role,
  };
  const userAccessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_secret_key as string,
    {
      expiresIn: config.jwt_access_expires_in,
    },
  );
  const userRefreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret_key as string,
    {
      expiresIn: config.jwt_refresh_expires_in,
    },
  );
  return {
    userAccessToken,
    userRefreshToken,
    user,
  };
};
const refreshToken = async (token: string) => {
  if (!token) {
    throw new HelperError(
      httpStatus.UNAUTHORIZED,
      'You have no access to this',
    );
  }
  const decode = jwt.verify(
    token,
    config.jwt_refresh_secret_key as string,
  ) as JwtPayload;

  if (!decode) {
    throw new HelperError(
      httpStatus.UNAUTHORIZED,
      'You have no access to this',
    );
  }
  const { user_email } = decode;
  const user = await User.findOne({ email: user_email });
  if (!user) {
    throw new HelperError(httpStatus.NOT_FOUND, 'User not found');
  }

  const jwtPayload = {
    user_email: user?.email,
    user_role: user?.role,
  };
  const userAccessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_secret_key as string,
    {
      expiresIn: config.jwt_access_expires_in,
    },
  );

  return userAccessToken;
};
const getProfileFromDB = async (payload: JwtPayload) => {
  const { user_email: email } = payload;

  const isUserExists = await User.findOne({ email: email });
  if (!isUserExists) {
    throw new HelperError(httpStatus.NOT_FOUND, 'User not found');
  }
  const userProfile = await User.findOne({ email });

  return userProfile;
};

const updateProfileIntoDB = async (updatedData: TUser, payload: JwtPayload) => {
  const { user_email: email } = payload;
  const isUserExists = await User.findOne({ email: email });
  if (!isUserExists) {
    throw new HelperError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await User.findOneAndUpdate({ email }, updatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};
export const UserServices = {
  signUp,
  login,
  getProfileFromDB,
  updateProfileIntoDB,
  refreshToken,
};
