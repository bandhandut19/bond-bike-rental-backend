/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import HelperError from '../../errors/HelperError';
import { Bike } from '../Bike/bike.model';
import { TBooking } from '../Booking/booking.interface';
import { Booking } from '../Booking/booking.model';
import { PaymentUtils } from './Payment.util';
import { startSession } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../User/user.model';
const bookingConfirm = async (
  transID: string,
  payload: TBooking,
  user: JwtPayload,
) => {
  const session = await startSession();
  const { bikeId } = payload;
  try {
    session.startTransaction();
    const userEmail = user?.user_email;

    // verifications -----
    // verifications -----

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
    const isBikeAvailable = isBikeExists?.isAvailable;
    if (!isBikeAvailable) {
      throw new HelperError(
        httpStatus.BAD_REQUEST,
        'Bike is not available for rent! Currently rented out!!!',
      );
    }
    // ---------------
    // ---------------
    const verifyAdvancePay = await PaymentUtils.verifyAdvancePayment(transID);
    if (verifyAdvancePay && verifyAdvancePay.pay_status === 'Successful') {
      //  changing availability to false
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
      const result = await Booking.create([payload], { session });
      await session.commitTransaction();
      await session.endSession();
      return result;
    }
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

export const PaymentServices = {
  bookingConfirm,
};
