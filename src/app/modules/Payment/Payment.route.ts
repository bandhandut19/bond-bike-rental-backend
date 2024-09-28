import express from 'express';
import { paymentControllers } from './Payment.controller';
const router = express.Router();

router.post('/bookingConfirmation', paymentControllers.bookingConfirm);
router.post('/rentalPayment', paymentControllers.rentalPaymentConfim);

export const PaymentRoutes = router;
