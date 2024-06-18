import httpStatus from 'http-status';
import helperAsync from '../../utils/helperAsync';
import HelperResponse from '../../utils/helperResponse';
import { BookingServices } from './booking.service';

const createRental = helperAsync(async (req, res, next) => {
  const payload = req.body;
  const user = req.user;
  const result = await BookingServices.createRentalIntoDB(payload, user);

  HelperResponse(res, {
    success: true,
    stausCode: httpStatus.OK,
    message: 'Rental created successfully',
    data: result,
  });
});

export const BookingControllers = {
  createRental,
};
