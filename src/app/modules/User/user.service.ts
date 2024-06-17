import { TUser } from './user.interface';
import { User } from './user.model';

const signUp = async (payload: TUser) => {
  const { email, password } = payload;
  //     const isValid
  //   // checking if email exists
  //   if (await User.isEmailExists(email)) {
  //     throw new Error('Email already exists! Try with new email !');
  //   }

  const result = await User.create(payload);
  console.log(result);
  return result;
};

export const UserServices = {
  signUp,
};
