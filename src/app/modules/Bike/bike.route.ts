import express from 'express';
import validate from '../../middlewares/validate';
import { BikeValidations } from './bike.validation';
import { BikeControllers } from './bike.controller';
const router = express.Router();

router.post(
  '/',
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
