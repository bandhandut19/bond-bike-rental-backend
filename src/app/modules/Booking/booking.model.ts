import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
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
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = model<TBooking>('booking', bookingSchema);
