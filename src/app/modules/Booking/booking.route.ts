import express from 'express';
import validate from '../../middlewares/validate';
import { BookingValidations } from './booking.validation';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';
import { UserRoles } from '../User/user.constant';
const router = express.Router();

router.post(
  '/',
  auth(UserRoles.ADMIN, UserRoles.USER),
  validate(BookingValidations.createBookingValidationSchema),
  BookingControllers.createRental,
);
router.put('/');
router.get('/');

export const BookingRoutes = router;
