/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from 'jsonwebtoken';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { User } from '../User/user.model';
import { startSession } from 'mongoose';
import { Bike } from '../Bike/bike.model';
import HelperError from '../../errors/HelperError';
import httpStatus from 'http-status';

const createRentalIntoDB = async (payload: TBooking, user: JwtPayload) => {
  const session = await startSession();
  const { bikeId } = payload;

  try {
    session.startTransaction();

    const userEmail = user?.user_email;
    if (!userEmail) {
      throw new HelperError(
        httpStatus.NOT_FOUND,
        'User email not found in JWT payload',
      );
    }

    const userData = await User.findOne({ email: userEmail }).session(session);
    if (!userData) {
      throw new Error('User not found');
    }

    // const isBikeExists = await Bike.isBikeExists(bikeId);
    const isBikeExists = await Bike.findById(bikeId).session(session);
    if (!isBikeExists) {
      throw new HelperError(httpStatus.NOT_FOUND, 'Bike not found');
    }
    //checking if bike available
    const isBikeAvailable = isBikeExists?.isAvailable;
    if (!isBikeAvailable) {
      throw new HelperError(
        httpStatus.BAD_REQUEST,
        'Bike is not available for rent! Currently rented out!!!',
      );
    }
    // changing availability to false
    const changeAvailablity = await Bike.findByIdAndUpdate(
      isBikeExists,
      {
        isAvailable: false,
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    const userId = userData._id;
    payload.userId = userId;

    const result = await Booking.create([payload], { session });

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const returnBikeIntoDB = async (id: string) => {
  const session = await startSession();
  try {
    session.startTransaction();
    const isBikeExists = await Bike.findById(id).session(session);
    if (!isBikeExists) {
      throw new Error('Bike not found');
    }
    const changeAvailability = await Bike.findByIdAndUpdate(
      isBikeExists,
      {
        isAvailable: true,
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    const bookedBike = await Booking.findOne({ bikeId: id }).session(session);

    const isReturnedPreviously = bookedBike?.isReturned;
    if (isReturnedPreviously) {
      throw new Error('Bike is already returned');
    }

    //CALCULATING TOTAL COST
    const returnTime = new Date().toISOString();
    const startTime = bookedBike?.startTime as string;
    const pricePerHour = isBikeExists?.pricePerHour;
    const totalRentHour =
      (new Date(returnTime).getTime() - new Date(startTime).getTime()) /
      (1000 * 60 * 60);

    const totalCost = Number((pricePerHour * totalRentHour).toFixed(2));

    const updateBooking = await Booking.findByIdAndUpdate(
      bookedBike,
      {
        returnTime: returnTime,
        totalCost: totalCost,
        isReturned: true,
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    await session.commitTransaction();
    await session.endSession();
    return updateBooking;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const getAllRentalsFromDB = async (user: JwtPayload) => {
  const { user_email } = user;
  const isUserExists = await User.findOne({ email: user_email });
  if (!isUserExists) {
    throw new Error('User not found');
  }
  const userRentals = await Booking.find({ userId: isUserExists });
  if (userRentals.length <= 0) {
    throw new Error('No data found');
  }
  return userRentals;
};
export const BookingServices = {
  createRentalIntoDB,
  returnBikeIntoDB,
  getAllRentalsFromDB,
};
