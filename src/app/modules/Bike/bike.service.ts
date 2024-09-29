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

const getAllBikesFromDB = async (query: Record<string, unknown>) => {
  const filterQuery: Record<string, unknown> = {};
  console.log(filterQuery);
  // const { user_email } = payload;
  // const isUserExists = await User.findOne({ email: user_email });
  // if (!isUserExists) {
  //   throw new HelperError(httpStatus.NOT_FOUND, 'User not found');
  // }

  try {
    if (query.searchByName) {
      filterQuery.name = {
        $regex: query.searchByName as string,
        $options: 'i',
      };
    }
    if (query.searchByBrand) {
      filterQuery.brand = {
        $regex: query.searchByBrand as string,
        $options: 'i',
      };
    }
    if (query.searchByModel) {
      filterQuery.model = {
        $regex: query.searchByModel as string,
        $options: 'i',
      };
    }
    if (query.searchByAvailability) {
      if (query.searchByAvailability === 'Available') {
        filterQuery.isAvailable = true;
      }
      if (query.searchByAvailability === 'Not Available') {
        filterQuery.isAvailable = false;
      }
    }

    const result = await Bike.find(filterQuery);
    return result;
  } catch (error) {
    // Handle error appropriately (e.g., log it, rethrow it, etc.)
    throw new Error('Error fetching bikes:');
  }
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
