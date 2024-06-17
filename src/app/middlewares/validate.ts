import { AnyZodObject } from 'zod';
import helperAsync from '../utils/helperAsync';
import { NextFunction, Request, Response } from 'express';

const validate = (schema: AnyZodObject) => {
  return helperAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await schema.parseAsync({ body: req.body });
      next();
    },
  );
};

export default validate;
