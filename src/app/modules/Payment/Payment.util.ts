import axios from 'axios';
import config from '../../config';
import { TPaymentDetails } from '../Booking/booking.interface';

const initialBookingAdvancePayment = async (
  paymentDetails: TPaymentDetails,
) => {
  const res = await axios.post(config.PAYMENT_URL!, {
    store_id: config.STORE_ID,
    signature_key: config.SIGNATURE_KEY,
    tran_id: paymentDetails.transactionId,
    success_url: 'http://www.merchantdomain.com/sucesspage.html',
    fail_url: 'http://www.merchantdomain.com/failedpage.html',
    cancel_url: 'http://www.merchantdomain.com/cancellpage.html',
    amount: paymentDetails.amount,
    currency: 'BDT',
    desc: 'Merchant Registration Payment',
    cus_name: paymentDetails.userName,
    cus_email: paymentDetails.userEmail,
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

export const PaymentUtils = {
  initialBookingAdvancePayment,
};
