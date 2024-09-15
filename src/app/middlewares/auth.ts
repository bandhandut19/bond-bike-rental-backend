import httpStatus from 'http-status';
import config from '../config';
import HelperError from '../errors/HelperError';
import { TUserRoles } from '../modules/User/user.interface';
import helperAsync from '../utils/helperAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = (...userRoles: TUserRoles[]) => {
  return helperAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    // if token is provided
    if (!token) {
      throw new HelperError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    // Split the token into scheme and value
    const [scheme, tokenValue] = token.split(' ');
    if (scheme !== 'Bearer' || !tokenValue) {
      throw new HelperError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    // Verify JWT token
    jwt.verify(
      tokenValue,
      config.jwt_access_secret_key as string,
      (err, decoded) => {
        if (err) {
          throw new HelperError(
            httpStatus.UNAUTHORIZED,
            'You have no access to this route',
          );
        }

        // Check user role
        const role = (decoded as JwtPayload)?.user_role;
        if (userRoles.length && !userRoles.includes(role)) {
          throw new HelperError(
            httpStatus.UNAUTHORIZED,
            'You have no access to this route',
          );
        }

        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
