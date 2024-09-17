import express from 'express';
import validate from '../../middlewares/validate';
import { BikeValidations } from './bike.validation';
import { BikeControllers } from './bike.controller';
import auth from '../../middlewares/auth';
import { UserRoles } from '../User/user.constant';
const router = express.Router();

router.post(
  '/',
  auth(UserRoles.ADMIN),
  validate(BikeValidations.createBikeValidationSchema),
  BikeControllers.createBike,
);
router.get(
  '/',
  // auth(UserRoles.ADMIN, UserRoles.USER),
  BikeControllers.getAllBikes,
);
router.put(
  '/:id',
  auth(UserRoles.ADMIN),
  validate(BikeValidations.updateBikeValidationSchema),
  BikeControllers.updateBike,
);
router.delete('/:id', auth(UserRoles.ADMIN), BikeControllers.deleteBike);

export const BikeRoutes = router;
