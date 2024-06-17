import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    bikeId: z.string(),
    startTime: z.string(),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
