/* eslint-disable @typescript-eslint/no-unused-vars */
import helperAsync from '../../utils/helperAsync';
import helperNoDataFound from '../../utils/helperNoDataFound';
import { PaymentServices } from './Payment.service';
import { join } from 'path';
import { readFileSync } from 'fs';

const bookingConfirm = helperAsync(async (req, res, next) => {
  const { transactionid, status, user, bike, time } = req.query;
  const result = await PaymentServices.bookingConfirm(
    transactionid as string,
    status as string,
    user as string,
    bike as string,
    time as string,
  );
  if (result === null) {
    return helperNoDataFound(res);
  }

  const filePath = join(__dirname, '../../views/PaymentPage.html');
  let advancePaymentTemplate = readFileSync(filePath, 'utf-8');
  advancePaymentTemplate = advancePaymentTemplate.replace(
    '{{status}}',
    status as string,
  );
  if (status === 'success') {
    advancePaymentTemplate = advancePaymentTemplate.replace(
      '{{messageOne}}',
      `Your Advance Payment for bike booking was Successful`,
    );
    advancePaymentTemplate = advancePaymentTemplate.replace(
      '{{messageTow}}',
      `TransactionID: ${transactionid}`,
    );
    advancePaymentTemplate = advancePaymentTemplate.replace(
      '{{messageThree}}',
      `Advance Payment Amount: 100 BDT Only`,
    );
  }
  if (status === 'failed') {
    advancePaymentTemplate = advancePaymentTemplate.replace(
      '{{messageOne}}',
      `Your Advance Payment for bike booking was Unsuccessful`,
    );
    advancePaymentTemplate = advancePaymentTemplate.replace(
      '{{messageTow}}',
      `N/A`,
    );
    advancePaymentTemplate = advancePaymentTemplate.replace(
      '{{messageThree}}',
      `Advance Payment Amount: N/A`,
    );
  }
  if (status === 'cancelled') {
    advancePaymentTemplate = advancePaymentTemplate.replace(
      '{{messageOne}}',
      `Your Advance Payment for bike booking was Cancelled`,
    );
    advancePaymentTemplate = advancePaymentTemplate.replace(
      '{{messageTow}}',
      `N/A`,
    );
    advancePaymentTemplate = advancePaymentTemplate.replace(
      '{{messageThree}}',
      `Advance Payment Amount: N/A`,
    );
  }

  res.send(advancePaymentTemplate);
});

export const paymentControllers = {
  bookingConfirm,
};
