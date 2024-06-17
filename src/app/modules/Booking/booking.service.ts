import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const createRentalIntoDB = async (payload: TBooking) => {
  const result = await Booking.create(payload);
  return result;
};

export const BookingServices = {
  createRentalIntoDB,
};
