/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import helperAsync from '../../utils/helperAsync';
import HelperResponse from '../../utils/helperResponse';
import { UserServices } from './user.service';
import helperNoDataFound from '../../utils/helperNoDataFound';
import config from '../../config';

const signUp = helperAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await UserServices.signUp(payload);
  if (result === null) {
    return helperNoDataFound(res);
  }
  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.CREATED,
    message: 'User Registered Successfully',
    data: result,
  });
});
const login = helperAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await UserServices.login(payload);
  const { userRefreshToken, userAccessToken, validUser } = result;
  res.cookie('refreshToken', userRefreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
  });

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in Successfully',
    token: userAccessToken,
    data: validUser,
  });

  // HelperResponse(res, {
  //   success: true,
  //   stausCode: httpStatus.CREATED,
  //   message: 'User logged in Successfully',
  //   data: {
  //     userAccessToken,
  //   },
  // });
});
const getProfile = helperAsync(async (req, res, next) => {
  const payload = req?.user;
  const result = await UserServices.getProfileFromDB(payload);
  if (result === null) {
    return helperNoDataFound(res);
  }
  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.OK,
    message: 'User profile retrived Successfully',
    data: result,
  });
});
const getAllUsers = helperAsync(async (req, res, next) => {
  const payload = req?.user;
  const result = await UserServices.getAllUsersFromDB(payload);
  if (result === null) {
    return helperNoDataFound(res);
  }
  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.OK,
    message: 'All Users retrived Successfully',
    data: result,
  });
});
const deleteUser = helperAsync(async (req, res, next) => {
  const payload = req?.user;
  const id = req?.params.id;
  const result = await UserServices.deleteUserFromDB(payload, id);
  if (result === null) {
    return helperNoDataFound(res);
  }
  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.OK,
    message: 'User Deleted Successfully',
    data: result,
  });
});

const updateProfile = helperAsync(async (req, res, next) => {
  const updatedData = req.body;
  const payload = req?.user;
  const result = await UserServices.updateProfileIntoDB(updatedData, payload);
  if (result === null) {
    return helperNoDataFound(res);
  }
  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.CREATED,
    message: 'Profile updated Successfully',
    data: result,
  });
});
const refreshToken = helperAsync(async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const result = await UserServices.refreshToken(refreshToken);

  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.CREATED,
    message: 'Access token retrived Successfully',
    data: result,
  });
});
export const UserControllers = {
  signUp,
  login,
  getProfile,
  updateProfile,
  refreshToken,
  getAllUsers,
  deleteUser,
};
