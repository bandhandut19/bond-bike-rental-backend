import { Types } from 'mongoose';
import { TUser } from '../User/user.interface';
import { TBike } from '../Bike/bike.interface';

export type TBooking = {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: string;
  transactionID: string;
  returnTime?: string;
  totalCost?: number;
  isReturned?: boolean;
  advancePayment?: boolean;
};

export type TPaymentDetails = {
  user: TUser;
  bike: TBike;
  userAddress: string;
  userPhone: string;
  amount: number;
  transactionId: string;
  startTime: string;
};

export type TCalculate = {
  bookingId: string;
  bikeReturnTime: string;
};
