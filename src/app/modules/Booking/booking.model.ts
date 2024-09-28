import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    bikeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'bike',
    },
    startTime: {
      type: String,
      required: true,
    },
    returnTime: {
      type: String,
      default: null,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
    advancePayment: {
      type: Boolean,
      default: false,
    },
    transactionID: {
      type: String,
      required: true,
    },
    rentalTransactionID: {
      type: String,
      default: '',
    },
    payment: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = model<TBooking>('booking', bookingSchema);
