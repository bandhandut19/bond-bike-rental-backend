import { Model } from 'mongoose';

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'admin' | 'user';
}

export type TAuth = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  isEmailExists(email: string): boolean;
  encryptPassword(plainPassword: string): Promise<string>;
  isValidPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRoles = 'admin' | 'user';
