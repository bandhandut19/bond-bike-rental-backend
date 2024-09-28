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

router.post(
  '/:bookingId/payRental/:amount',
  auth(UserRoles.ADMIN, UserRoles.USER),
  BookingControllers.payRental,
);
//only admin can calculate
router.patch(
  '/calculate',
  auth(UserRoles.ADMIN),
  BookingControllers.returnBikeAndCalculateCost,
);
router.get(
  '/',
  auth(UserRoles.USER, UserRoles.ADMIN),
  BookingControllers.myRentals,
);
// only admin can retrive all rentals
router.get('/all', auth(UserRoles.ADMIN), BookingControllers.allRentals);

export const BookingRoutes = router;
