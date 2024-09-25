import { Types } from 'mongoose';

export type TBooking = {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: string;
  returnTime: string;
  totalCost: number;
  isReturned: boolean;
  advancePayment: boolean;
  transactionID: string;
};

export type TPaymentDetails = {
  userName: string;
  userEmail: string;
  userAddress: string;
  userPhone: string;
  amount: number;
  transactionId: string;
};
