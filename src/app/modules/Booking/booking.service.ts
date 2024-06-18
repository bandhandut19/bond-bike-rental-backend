import { JwtPayload } from 'jsonwebtoken';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { User } from '../User/user.model';

const createRentalIntoDB = async (payload: TBooking, user: JwtPayload) => {
  const userEmail = user?.user_email;
  if (!userEmail) {
    throw new Error('User email not found in JWT payload');
  }
  const userData = await User.findOne({ email: userEmail });
  if (!userData) {
    throw new Error('User not found');
  }
  const userId = userData?._id;
  payload.userId = userId;

  console.log(payload);

  const result = await Booking.create(payload);
  return result;
};

export const BookingServices = {
  createRentalIntoDB,
};
