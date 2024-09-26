/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import helperAsync from '../../utils/helperAsync';
import helperNoDataFound from '../../utils/helperNoDataFound';
import HelperResponse from '../../utils/helperResponse';
import { PaymentServices } from './Payment.service';

const bookingConfirm = helperAsync(async (req, res, next) => {
  const transactionID = req.query.transactionid;

  const result = await PaymentServices.bookingConfirm(transactionID as string);
  if (result === null) {
    return helperNoDataFound(res);
  }
  res.send(
    `<h1>Payment Success</h1> <br> <a href="http://localhost:5173/">Go to Home</a>`,
  );

  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.OK,
    message: 'Booking Confimed successfully',
    data: result,
  });
});

export const paymentControllers = {
  bookingConfirm,
};
