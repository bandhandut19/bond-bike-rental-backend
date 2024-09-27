/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import helperAsync from '../../utils/helperAsync';
import HelperResponse from '../../utils/helperResponse';
import { BookingServices } from './booking.service';
import helperNoDataFound from '../../utils/helperNoDataFound';

const createRental = helperAsync(async (req, res, next) => {
  const payload = req.body;
  const user = req.user;
  const result = await BookingServices.createRentalIntoDB(payload, user);
  if (Object.keys(result).length === 0) {
    return helperNoDataFound(res);
  }

  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.OK,
    message: 'Bike Rental process started successfully',
    data: result,
  });
});
const returnBike = helperAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = req.user;
  const result = await BookingServices.returnBikeIntoDB(id, user);
  if (result === null) {
    return helperNoDataFound(res);
  }
  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.OK,
    message: 'Bike Returned successfully',
    data: result,
  });
});
const myRentals = helperAsync(async (req, res, next) => {
  const user = req.user;
  const result = await BookingServices.getAllRentalsFromDB(user);
  if (result.length <= 0) {
    return helperNoDataFound(res);
  }
  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.OK,
    message: 'Rentals retrived successfully',
    data: result,
  });
});
const allRentals = helperAsync(async (req, res, next) => {
  const user = req.user;
  const result = await BookingServices.getOverAllRentalsFromDB(user);
  if (result.length <= 0) {
    return helperNoDataFound(res);
  }
  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.OK,
    message: 'All users Rentals retrived successfully',
    data: result,
  });
});
const calculateCost = helperAsync(async (req, res, next) => {
  const payload = req.body;
  const user = req.user;
  const result = await BookingServices.setTotalCostOfSpecificUserIntoDB(
    payload,
    user,
  );

  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.OK,
    message: 'All users Rentals retrived successfully',
    data: result,
  });
});

export const BookingControllers = {
  createRental,
  returnBike,
  myRentals,
  allRentals,
  calculateCost,
};
