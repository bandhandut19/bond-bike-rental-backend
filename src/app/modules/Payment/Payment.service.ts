/* eslint-disable @typescript-eslint/no-unused-vars */

import { Bike } from '../Bike/bike.model';
import { TBooking } from '../Booking/booking.interface';
import { Booking } from '../Booking/booking.model';
import { User } from '../User/user.model';
import { PaymentUtils } from './Payment.util';
import { startSession } from 'mongoose';

const bookingConfirm = async (
  transID: string,
  status: string,
  user: string,
  bike: string,
  time: string,
) => {
  const session = await startSession();
  try {
    session.startTransaction();
    // verifying payment, then changing bike availablity and advance-payment status
    const verifyAdvancePay = await PaymentUtils.verifyPayment(transID);
    if (
      verifyAdvancePay &&
      verifyAdvancePay.pay_status === 'Successful' &&
      status === 'success'
    ) {
      // getting user
      const userDB = await User.findById(user).session(session);
      if (!userDB) {
        throw new Error('User not found');
      }
      const userDBId = userDB?._id;
      // getting bike
      const bikeDB = await Bike.findById(bike).session(session);
      if (!bikeDB) {
        throw new Error('Bike not found');
      }
      const bikeDBId = bikeDB?._id;
      //  changing availability to false
      const changeAvailablity = await Bike.findByIdAndUpdate(
        bikeDBId,
        {
          isAvailable: false,
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      const payload: TBooking = {
        userId: userDBId,
        bikeId: bikeDBId,
        advancePayment: true,
        transactionID: transID,
        startTime: time,
      };
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
const rentalPaymentConfirm = async (
  transID: string,
  booking: string,
  status: string,
) => {
  const session = await startSession();
  try {
    session.startTransaction();
    // verifying payment, then changing payment status
    const verifyRentalPay = await PaymentUtils.verifyPayment(transID);
    if (
      verifyRentalPay &&
      verifyRentalPay.pay_status === 'Successful' &&
      status === 'success'
    ) {
      // getting booking
      const bookingDB = await Booking.findById(booking).session(session);
      if (!bookingDB) {
        throw new Error('Bike not found');
      }
      const bookingDBId = bookingDB?._id;
      //  changing availability to false
      const changingPaymentStatus = await Booking.findByIdAndUpdate(
        bookingDBId,
        {
          rentalTransactionID: transID,
          payment: true,
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      await session.commitTransaction();
      await session.endSession();
      return changingPaymentStatus;
    }
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

export const PaymentServices = {
  bookingConfirm,
  rentalPaymentConfirm,
};
