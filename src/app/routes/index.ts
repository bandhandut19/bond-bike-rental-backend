import express from 'express';
import { AuthRoutes, UsersRoutes } from '../modules/User/user.route';
import { BikeRoutes } from '../modules/Bike/bike.route';
import { BookingRoutes } from '../modules/Booking/booking.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UsersRoutes,
  },
  {
    path: '/bikes',
    route: BikeRoutes,
  },
  {
    path: '/rentals',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
