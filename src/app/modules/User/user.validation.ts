import { z } from 'zod';
import { UserRoles } from './user.constant';

const UserRole = z.enum([UserRoles.ADMIN, UserRoles.USER]);
const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
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
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
