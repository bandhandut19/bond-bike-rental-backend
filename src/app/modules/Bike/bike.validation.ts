import { z } from 'zod';

const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    pricePerHour: z.number(),
    cc: z.string(),
    year: z.string(),
    model: z.string(),
    brand: z.string(),
  }),
});
const updateBikeValidationSchema = z.object({
  body: z.object({
    pricePerHour: z.number(),
  }),
});

export const BikeValidations = {
  createBikeValidationSchema,
  updateBikeValidationSchema,
};
