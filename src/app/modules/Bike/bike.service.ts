import { JwtPayload } from 'jsonwebtoken';
import { User } from '../User/user.model';
import { TBike } from './bike.interface';
import { Bike } from './bike.model';
import HelperError from '../../errors/HelperError';
import httpStatus from 'http-status';

const createBikeIntoDB = async (payload: TBike, user: JwtPayload) => {
  const { user_email } = user;
  const isUserExists = await User.findOne({ email: user_email });
  if (!isUserExists) {
    throw new HelperError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await Bike.create(payload);
  return result;
};

const getAllBikesFromDB = async () => {
  // const { user_email } = payload;
  // const isUserExists = await User.findOne({ email: user_email });
  // if (!isUserExists) {
  //   throw new HelperError(httpStatus.NOT_FOUND, 'User not found');
  // }
  const result = await Bike.find();
  return result;
};

const updateBikeIntoDB = async (
  payload: Partial<TBike>,
  id: string,
  user: JwtPayload,
) => {
  const { user_email } = user;
  const isUserExists = await User.findOne({ email: user_email });
  if (!isUserExists) {
    throw new HelperError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await Bike.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteBikeFromDB = async (id: string, user: JwtPayload) => {
  const { user_email } = user;
  const isUserExists = await User.findOne({ email: user_email });
  if (!isUserExists) {
    throw new HelperError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await Bike.findByIdAndDelete(id);
  return result;
};
const getSingleBikeFromDB = async (id: string) => {
  // const { user_email } = user;
  // const isUserExists = await User.findOne({ email: user_email });
  // if (!isUserExists) {
  //   throw new HelperError(httpStatus.NOT_FOUND, 'User not found');
  // }
  const result = await Bike.findById(id);
  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
  getSingleBikeFromDB,
};
