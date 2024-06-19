import httpStatus from 'http-status';
import config from '../config';
import HelperError from '../errors/HelperError';
import { TUserRoles } from '../modules/User/user.interface';
import helperAsync from '../utils/helperAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
const auth = (...userRoles: TUserRoles[]) => {
  return helperAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('You are not authorized');
    }
    const getToken = token?.split(' ');
    if (getToken[0] !== 'Bearer') {
      throw new HelperError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }
    jwt.verify(
      getToken[1],
      config.jwt_access_secret_key as string,
      function (err, decoded) {
        if (err) {
          throw new Error('You have no access to this route');
        }
        const role = (decoded as JwtPayload)?.user_role;
        if (userRoles && !userRoles.includes(role)) {
          throw new Error('You have no access to this route');
        }
        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
