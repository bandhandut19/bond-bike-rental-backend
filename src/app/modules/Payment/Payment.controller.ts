/* eslint-disable @typescript-eslint/no-unused-vars */
import helperAsync from '../../utils/helperAsync';

const bookingConfirm = helperAsync(async (req, res, next) => {
  res.send(`<h1>Payment Success</h1>`);
});

export const paymentControllers = {
  bookingConfirm,
};
