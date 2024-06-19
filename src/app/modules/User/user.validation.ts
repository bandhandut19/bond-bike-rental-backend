import { z } from 'zod';
import { UserRoles } from './user.constant';

const UserRole = z.enum([UserRoles.ADMIN, UserRoles.USER]);
const updateUserRole = z.enum([UserRoles.ADMIN, UserRoles.USER]).optional();
const signUpUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    password: z.string({
      required_error: 'Password is required',
    }),
    phone: z.string(),
    address: z.string(),
    role: UserRole,
  }),
});
const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional(),
    role: updateUserRole.optional(),
  }),
});

export const UserValidations = {
  signUpUserValidationSchema,
  updateUserValidationSchema,
};

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});

export const AuthValidations = {
  loginValidationSchema,
  refreshTokenValidationSchema,
};
