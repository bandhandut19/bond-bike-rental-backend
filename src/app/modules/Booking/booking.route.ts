import express from 'express';
import validate from '../../middlewares/validate';
import { BookingValidations } from './booking.validation';
import { BookingControllers } from './booking.controller';
const router = express.Router();

router.post(
  '/',
  validate(BookingValidations.createBookingValidationSchema),
  BookingControllers.createRental,
);
router.put('/');
router.get('/');

export const BookingRoutes = router;
