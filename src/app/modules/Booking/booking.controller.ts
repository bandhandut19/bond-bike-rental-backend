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
const payRental = helperAsync(async (req, res, next) => {
  const bookingId = req.params.bookingId;
  const amount = req.params.amount;
  console.log('bodyy', amount);
  const user = req.user;
  const result = await BookingServices.payRentalOfBikeIntoDB(
    parseInt(amount),
    bookingId,
    user,
  );
  if (result === null) {
    return helperNoDataFound(res);
  }
  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.OK,
    message: 'Rental Payment started....',
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
const returnBikeAndCalculateCost = helperAsync(async (req, res, next) => {
  const payload = req.body;
  const user = req.user;
  const result =
    await BookingServices.setTotalCostOfSpecificUserAndReturnBikeIntoDB(
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
  payRental,
  myRentals,
  allRentals,
  returnBikeAndCalculateCost,
};
