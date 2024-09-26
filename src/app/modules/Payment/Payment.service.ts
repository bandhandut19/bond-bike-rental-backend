/* eslint-disable @typescript-eslint/no-unused-vars */

import { Bike } from '../Bike/bike.model';
import { Booking } from '../Booking/booking.model';
import { PaymentUtils } from './Payment.util';
import { startSession } from 'mongoose';

const bookingConfirm = async (transID: string, status: string) => {
  const session = await startSession();
  try {
    session.startTransaction();
    // verifying payment, then changing bike availablity and advance-payment status
    // if payment fails then the created booking..
    // will be deleted from database in failed payment page
    // this is success payment working
    const booking = await Booking.findOne({ transactionID: transID });
    const verifyAdvancePay = await PaymentUtils.verifyAdvancePayment(transID);
    if (
      verifyAdvancePay &&
      verifyAdvancePay.pay_status === 'Successful' &&
      status === 'success'
    ) {
      // getting bikeId
      const bike = booking?.bikeId;
      const bikeId = await Bike.findById(bike);

      //  changing availability to false
      const changeAvailablity = await Bike.findByIdAndUpdate(
        bikeId,
        {
          isAvailable: false,
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      // changing advance-payment status
      const result = await Booking.findOneAndUpdate(
        { transactionID: transID },
        {
          advancePayment: true,
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      await session.commitTransaction();
      await session.endSession();
      return result;
    }
    // if payment failed then the booking will be removed simultinously
    if (status === 'failed') {
      try {
        const result = await Booking.findByIdAndDelete(booking?._id, {
          runValidators: true,
          session,
        });
        await session.commitTransaction();
        return result;
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        await session.endSession();
      }
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
