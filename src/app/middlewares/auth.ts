import config from '../config';
import { TUserRoles } from '../modules/User/user.interface';
import helperAsync from '../utils/helperAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
const auth = (...userRoles: TUserRoles[]) => {
  return helperAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('You are not authorized');
    }

    jwt.verify(
      token,
      config.jwt_access_secret_key as string,
      function (err, decoded) {
        if (err) {
          throw new Error('You are not authorized');
        }
        const role = (decoded as JwtPayload)?.user_role;
        if (userRoles && !userRoles.includes(role)) {
          throw new Error('You are not authorized');
        }
        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
