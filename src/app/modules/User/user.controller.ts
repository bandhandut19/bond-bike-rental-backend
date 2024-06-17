import httpStatus from 'http-status';
import helperAsync from '../../utils/helperAsync';
import HelperResponse from '../../utils/helperResponse';
import { UserServices } from './user.service';

const signUp = helperAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await UserServices.signUp(payload);

  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.CREATED,
    message: 'User Registered Successfully',
    data: result,
  });
});

export const UserControllers = {
  signUp,
};
