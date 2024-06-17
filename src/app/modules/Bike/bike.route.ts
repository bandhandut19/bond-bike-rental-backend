import express from 'express';
import validate from '../../middlewares/validate';
import { BikeValidations } from './bike.validation';
import { BikeControllers } from './bike.controller';
import auth from '../../middlewares/auth';
import { UserRoles } from '../User/user.constant';
const router = express.Router();

router.post(
  '/',
  auth(UserRoles.USER),
  validate(BikeValidations.createBikeValidationSchema),
  BikeControllers.createBike,
);
router.get('/', BikeControllers.getAllBikes);
router.put(
  '/:id',
  validate(BikeValidations.updateBikeValidationSchema),
  BikeControllers.updateBike,
);
router.delete('/:id', BikeControllers.deleteBike);

export const BikeRoutes = router;
