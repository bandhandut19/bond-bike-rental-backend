import { Model } from 'mongoose';
import { UserRoles } from './user.constant';

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'admin' | 'user';
}

export interface UserModel extends Model<TUser> {
  isEmailExists(email: string): boolean;
  encryptPassword(plainPassword: string): Promise<string>;
}

export type TUserRoles = keyof typeof UserRoles;
