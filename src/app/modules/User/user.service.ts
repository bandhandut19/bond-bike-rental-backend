import { TUser } from './user.interface';
import { User } from './user.model';

const signUp = async (payload: TUser) => {
  const { email, password } = payload;

  // checking if email exists
  if (User.isEmailExists(email)) {
    throw new Error('Email already exists! Try with new email !');
  }

  const encryptedPassword = await User.encryptPassword(password);

  const result = await User.create(payload, {
    $set: { password: encryptedPassword },
  });
  console.log(result);
  return result;
};

export const UserServices = {
  signUp,
};
