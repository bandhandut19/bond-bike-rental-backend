import { Types } from 'mongoose';

export type TBooking = {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: string;
  transactionID: string;
  returnTime: string;
  totalCost: number;
  isReturned: boolean;
  advancePayment: boolean;
};

export type TPaymentDetails = {
  userName: string;
  userEmail: string;
  userAddress: string;
  userPhone: string;
  amount: number;
  transactionId: string;
};

export type TCalculate = {
  bookingId: string;
  bikeReturnTime: string;
};
