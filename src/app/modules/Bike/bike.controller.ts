import httpStatus from 'http-status';
import helperAsync from '../../utils/helperAsync';
import HelperResponse from '../../utils/helperResponse';
import { BikeServices } from './bike.service';

const createBike = helperAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await BikeServices.createBikeIntoDB(payload);
  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.OK,
    message: 'Bike added successfully',
    data: result,
  });
});

const getAllBikes = helperAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await BikeServices.getAllBikesFromDB();
  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.OK,
    message: 'Bikes retrived successfully',
    data: result,
  });
});
const updateBike = helperAsync(async (req, res, next) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await BikeServices.updateBikeIntoDB(payload, id);
  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.OK,
    message: 'Bike updated successfully',
    data: result,
  });
});
const deleteBike = helperAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await BikeServices.deleteBikeFromDB(id);
  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.OK,
    message: 'Bike deleted successfully',
    data: result,
  });
});

export const BikeControllers = {
  createBike,
  getAllBikes,
  updateBike,
  deleteBike,
};
