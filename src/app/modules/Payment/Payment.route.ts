import express from 'express';
import { paymentControllers } from './Payment.controller';
const router = express.Router();

router.post('/bookingConfirmation', paymentControllers.bookingConfirm);

export const PaymentRoutes = router;
