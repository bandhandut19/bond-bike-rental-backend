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
router.put('/:id/return', auth(UserRoles.ADMIN), BookingControllers.returnBike);
router.get('/', auth(UserRoles.USER), BookingControllers.myRentals);

export const BookingRoutes = router;
