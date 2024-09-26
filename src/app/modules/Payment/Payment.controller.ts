/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import helperAsync from '../../utils/helperAsync';
import helperNoDataFound from '../../utils/helperNoDataFound';
import HelperResponse from '../../utils/helperResponse';
import { PaymentServices } from './Payment.service';

const bookingConfirm = helperAsync(async (req, res, next) => {
  const { transactionid, status } = req.query;
  const result = await PaymentServices.bookingConfirm(
    transactionid as string,
    status as string,
  );
  if (result === null) {
    return helperNoDataFound(res);
  }
  res.send(
    `<h1>Payment ${status}</h1> <br> <a href="http://localhost:5173/">Go to Home</a>`,
  );
});

export const paymentControllers = {
  bookingConfirm,
};
