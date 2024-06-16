import { object, z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    userId: z.string(),
    bikeId: z.string(),
    startTime: z.string(),
    returnTime: z.string(),
    totalCost: z.number(),
    isReturned: z.boolean(),
  }),
});
