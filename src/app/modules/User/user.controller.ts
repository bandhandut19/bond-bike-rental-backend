/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import helperAsync from '../../utils/helperAsync';
import HelperResponse from '../../utils/helperResponse';
import { UserServices } from './user.service';
import helperNoDataFound from '../../utils/helperNoDataFound';

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

  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.CREATED,
    message: 'User logged in Successfully',
    data: result,
  });
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
export const UserControllers = {
  signUp,
  login,
  getProfile,
  updateProfile,
};
