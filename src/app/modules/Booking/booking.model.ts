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
      default: '',
    },
    totalCost: {
      type: Number,
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
