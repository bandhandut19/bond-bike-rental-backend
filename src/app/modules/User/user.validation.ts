import { AnyZodObject, z } from 'zod';
import { UserRoles } from './user.constant';

const UserRole = z.enum([UserRoles.ADMIN, UserRoles.USER]);
const updateUserRole = z.enum([UserRoles.ADMIN, UserRoles.USER]).optional();
const signUpUserValidationSchema: AnyZodObject = z.object({
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
const updateUserValidationSchema: AnyZodObject = z.object({
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

export const AuthValidations = {
  loginValidationSchema,
};
