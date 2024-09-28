/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from 'jsonwebtoken';
import {
  TBooking,
  TCalculate,
  TPaymentDetails,
  TRentalpaymentDetails,
} from './booking.interface';
import { Booking } from './booking.model';
import { User } from '../User/user.model';
import { startSession } from 'mongoose';
import { Bike } from '../Bike/bike.model';
import HelperError from '../../errors/HelperError';
import httpStatus from 'http-status';
import { PaymentUtils } from '../Payment/Payment.util';

const createRentalIntoDB = async (payload: TBooking, user: JwtPayload) => {
  const session = await startSession();
  const { bikeId, startTime } = payload;

  try {
    session.startTransaction();

    const userEmail = user?.user_email;
    if (!userEmail) {
      throw new HelperError(httpStatus.NOT_FOUND, 'User email not found');
    }

    const userData = await User.findOne({ email: userEmail }).session(session);
    if (!userData) {
      throw new Error('User not found');
    }

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

    const advancePaymentAmount = 100;
    const transactionPrefix = userData?.email.split('@');
    const paymentDetails: TPaymentDetails = {
      user: userData,
      bike: isBikeExists,
      userAddress: userData?.address,
      userPhone: userData?.phone,
      startTime: startTime,
      amount: advancePaymentAmount,
      // as here i have set the emails unique earlier.so transID with email&date will be unique too.
      transactionId: `${transactionPrefix[0]}-${Date.now()}`,
    };
    const booking =
      await PaymentUtils.initialBookingAdvancePayment(paymentDetails);
    const userId = userData._id;
    payload.userId = userId;
    payload.transactionID = paymentDetails?.transactionId;
    await session.commitTransaction();
    await session.endSession();
    const detailedResult = {
      booking,
    };
    return detailedResult;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const payRentalOfBikeIntoDB = async (
  amount: number,
  bookingId: string,
  user: JwtPayload,
) => {
  // user-verification
  const { user_email } = user;

  //....

  // booking-verification
  const isBookingExists = await Booking.findById(bookingId);
  if (!isBookingExists) {
    throw new HelperError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  //....
  const session = await startSession();
  try {
    session.startTransaction();

    const userData = await User.findOne({ email: user_email }).session(session);
    if (!userData) {
      throw new Error('User not found');
    }
    const transactionPrefix = userData?.email.split('@');
    const paymentDetails: TRentalpaymentDetails = {
      user: userData,
      bookingId,
      amount,
      transactionId: `${transactionPrefix[0]}-${Date.now()}`,
    };
    console.log(paymentDetails);
    const payRental = await PaymentUtils.rentalPayment(paymentDetails);
    await session.commitTransaction();
    await session.endSession();
    return payRental;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};
const setTotalCostOfSpecificUserAndReturnBikeIntoDB = async (
  payload: TCalculate,
  user: JwtPayload,
) => {
  const { user_email } = user;
  const { bookingId, bikeReturnTime } = payload;
  const isUserExists = await User.findOne({ email: user_email });
  if (!isUserExists) {
    throw new HelperError(httpStatus.NOT_FOUND, 'User not found');
  }
  const session = await startSession();
  try {
    session.startTransaction();
    const isBookingExists = await Booking.findById(bookingId).session(session);
    if (!isBookingExists) {
      throw new HelperError(httpStatus.NOT_FOUND, 'Booking not found');
    }
    const isBikeExists = await Bike.findById(isBookingExists?.bikeId).session(
      session,
    );
    if (!isBikeExists) {
      throw new Error('Bike not found');
    }
    // changing bike availability
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
    //CALCULATING TOTAL COST
    const initialreturnTime = new Date(bikeReturnTime);
    const formattedReturnTime =
      initialreturnTime.toISOString().slice(0, 19) + 'Z';

    const startTime = isBookingExists?.startTime as string;

    const pricePerHour = isBikeExists?.pricePerHour;
    const totalRentHour =
      (new Date(formattedReturnTime).getTime() -
        new Date(startTime).getTime()) /
      (1000 * 60 * 60);
    console.log(totalRentHour);
    const totalCost = Number((pricePerHour * totalRentHour).toFixed(2));

    const updateBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        returnTime: formattedReturnTime,
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
const getOverAllRentalsFromDB = async (user: JwtPayload) => {
  const { user_email } = user;
  const isUserExists = await User.findOne({ email: user_email });
  if (!isUserExists) {
    throw new Error('User not found');
  }
  const userRentals = await Booking.find();
  if (userRentals.length <= 0) {
    throw new Error('No users rentals data found');
  }
  return userRentals;
};
export const BookingServices = {
  createRentalIntoDB,
  payRentalOfBikeIntoDB,
  getAllRentalsFromDB,
  getOverAllRentalsFromDB,
  setTotalCostOfSpecificUserAndReturnBikeIntoDB,
};
