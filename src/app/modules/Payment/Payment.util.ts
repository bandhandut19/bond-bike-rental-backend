import axios from 'axios';
import config from '../../config';
import {
  TPaymentDetails,
  TRentalpaymentDetails,
} from '../Booking/booking.interface';

const initialBookingAdvancePayment = async (
  paymentDetails: TPaymentDetails,
) => {
  const res = await axios.post(config.PAYMENT_URL!, {
    store_id: config.STORE_ID,
    signature_key: config.SIGNATURE_KEY,
    tran_id: paymentDetails.transactionId,
    success_url: `https://bond-bike-rental.vercel.app/api/payment/bookingConfirmation?transactionid=${paymentDetails?.transactionId}&status=success&user=${paymentDetails.user._id}&bike=${paymentDetails.bike._id}&time=${paymentDetails.startTime}`,
    fail_url: `https://bond-bike-rental.vercel.app/api/payment/bookingConfirmation?status=failed`,
    cancel_url: `http://localhost:5173/allbikes`,
    amount: paymentDetails.amount,
    currency: 'BDT',
    desc: 'Advance Payment for Bike Rent',
    cus_name: paymentDetails.user.name,
    cus_email: paymentDetails.user.email,
    cus_add1: paymentDetails.userAddress,
    cus_add2: 'N/A',
    cus_city: 'N/A',
    cus_state: 'N/A',
    cus_postcode: 'N/A',
    cus_country: 'Bangladesh',
    cus_phone: paymentDetails.userPhone,
    type: 'json',
  });
  return res?.data;
};
const rentalPayment = async (paymentDetails: TRentalpaymentDetails) => {
  const res = await axios.post(config.PAYMENT_URL!, {
    store_id: config.STORE_ID,
    signature_key: config.SIGNATURE_KEY,
    tran_id: paymentDetails.transactionId,
    success_url: `https://bond-bike-rental.vercel.app/api/payment/rentalPayment?transactionid=${paymentDetails?.transactionId}&status=success&user=${paymentDetails.user._id}&booking=${paymentDetails.bookingId}&amount=${paymentDetails.amount}`,
    fail_url: `https://bond-bike-rental.vercel.app/api/payment/rentalPayment?status=failed`,
    cancel_url: `http://localhost:5173/allbikes`,
    amount: paymentDetails.amount,
    currency: 'BDT',
    desc: 'Bike Rental Payment',
    cus_name: paymentDetails.user.name,
    cus_email: paymentDetails.user.email,
    cus_add1: paymentDetails.user.address,
    cus_add2: 'N/A',
    cus_city: 'N/A',
    cus_state: 'N/A',
    cus_postcode: 'N/A',
    cus_country: 'Bangladesh',
    cus_phone: paymentDetails.user.phone,
    type: 'json',
  });
  return res?.data;
};

const verifyPayment = async (transID: string) => {
  const res = await axios.get(config.PAYMENT_VERIFY_URL!, {
    params: {
      request_id: transID,
      store_id: config.STORE_ID,
      signature_key: config.SIGNATURE_KEY,
      type: 'json',
    },
  });

  return res?.data;
};

export const PaymentUtils = {
  initialBookingAdvancePayment,
  verifyPayment,
  rentalPayment,
};
