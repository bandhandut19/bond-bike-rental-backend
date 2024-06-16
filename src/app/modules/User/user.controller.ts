import httpStatus from 'http-status';
import helperAsync from '../../utils/helperAsync';
import { UserServices } from './user.service';

const signUp = helperAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await UserServices.signUp(payload);

  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  });
});

export const UserControllers = {
  signUp,
};
