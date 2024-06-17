import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went worng',
    error: err,
  });
};

export default globalErrorHandler;
